import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DailySchedule() {
    const [schedule, setSchedule] = useState([]);
    const [timeUntilNext, setTimeUntilNext] = useState("");
  
    useEffect(() => {
        async function fetchSchedule() {
            const { data: Users, error: classError } = await supabase
              .from("Users")
              .select("class_time, class_location, class_endTime, name")
              .order("class_time", { ascending: true });
        
            if (classError) console.error("Error fetching classes:", classError);
        
            const { data: Preferences, error: preferenceError } = await supabase
              .from("Preferences")
              .select("name, duration")
              .order("duration", { ascending: true });
        
            if (preferenceError) console.error("Error fetching preferences:", preferenceError);
        
            const mergedSchedule = generateSchedule(Users || [], Preferences || []);
            setSchedule(mergedSchedule);
        }
        fetchSchedule();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (schedule.length > 0) {
                const now = new Date();
                const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
                
                let foundNext = false;
                for (let event of schedule) {
                    if (event.class_time > currentTime) {
                        setTimeUntilNext(`${timeDifference(currentTime, event.class_time)} minutes`);
                        foundNext = true;
                        break;
                    }
                }
                
                if (!foundNext) {
                    setTimeUntilNext("All Set for Day!");
                }
            } else {
                setTimeUntilNext("All Set for Day!");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [schedule]);
  
    function generateSchedule(Users, Preferences) {
        let scheduledItems = [...Users];
    
        scheduledItems.sort((a, b) => timeToMinutes(a.class_time) - timeToMinutes(b.class_time));
    
        Preferences.forEach((preference) => {
            let taskDuration = preference.duration * 60;
            let inserted = false;
    
            for (let i = 0; i < scheduledItems.length - 1; i++) {
                let currentClass = scheduledItems[i];
                let nextClass = scheduledItems[i + 1];
    
                let gapStart = addTime(currentClass.class_endTime, 10);
                let gapEnd = nextClass.class_time;
    
                if (timeDifference(gapStart, gapEnd) >= taskDuration) {
                    let taskStartTime = gapStart;
                    let taskEndTime = addTime(taskStartTime, taskDuration);
    
                    scheduledItems.splice(i + 1, 0, {
                        name: preference.name,
                        class_time: taskStartTime,
                        class_endTime: taskEndTime,
                        type: "Preference",
                    });
    
                    inserted = true;
                    break;
                }
            }
    
            if (!inserted && scheduledItems.length > 0) {
                let lastClass = scheduledItems[scheduledItems.length - 1];
                let lastEndTime = addTime(lastClass.class_endTime, 10);
                let taskEndTime = addTime(lastEndTime, taskDuration);
    
                if (timeDifference(lastEndTime, "23:59") >= taskDuration) {
                    scheduledItems.push({
                        name: preference.name,
                        class_time: lastEndTime,
                        class_endTime: taskEndTime,
                        type: "Preference",
                    });
                }
            }
    
            scheduledItems.sort((a, b) => timeToMinutes(a.class_time) - timeToMinutes(b.class_time));
        });
    
        return scheduledItems;
    }
    
    function timeDifference(start, end) {
        return timeToMinutes(end) - timeToMinutes(start);
    }
  
    function addTime(start, duration) {
        let [hours, minutes] = start.split(":" ).map(Number);
        let totalMinutes = hours * 60 + minutes + duration;
        let newHours = Math.floor(totalMinutes / 60);
        let newMinutes = totalMinutes % 60;
        return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
    }
  
    function timeToMinutes(time) {
        let [hours, minutes] = time.split(":" ).map(Number);
        return hours * 60 + minutes;
    }
    
    function formatTime(time) {
        let [hours, minutes] = time.split(":" ).map(Number);
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
    }
    
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Today's Schedule</h2>
        <p className="text-lg font-semibold mb-4">Time until next event: {timeUntilNext}</p>
        <div className="border-l-4 border-blue-500 pl-6 space-y-4">
          {schedule.length === 0 ? (
            <p>No events scheduled for today!</p>
          ) : (
            schedule.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-white p-4 rounded-lg shadow-md border">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <p className="text-gray-600">{formatTime(event.class_time)} - {formatTime(event.class_endTime)}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${event.type === "Preference" ? "bg-green-300 text-green-800" : "bg-blue-300 text-blue-800"}`}>
                    {event.type === "Preference" ? "Preference" : "Class"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
}
