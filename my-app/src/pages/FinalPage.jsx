import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DailySchedule() {
    const [schedule, setSchedule] = useState([]);
  
    useEffect(() => {
        async function fetchSchedule() {
            // Fetch classes
            const { data: Users, error: classError } = await supabase
              .from("Users")
              .select("class_time, class_location, class_endTime")
              .order("class_time", { ascending: true });
        
            if (classError) console.error("Error fetching classes:", classError);
        
            // Fetch tasks (user-defined preferences)
            const { data: Preferences, error: preferenceError } = await supabase
              .from("Preferences")
              .select("name, duration")
              .order("duration", { ascending: true });
        
            if (preferenceError) console.error("Error fetching preferences:", preferenceError);
        
            // Process schedule
            const mergedSchedule = generateSchedule(Users || [], Preferences || []);
            setSchedule(mergedSchedule);
        }
        fetchSchedule();
    }, []);
  
    function generateSchedule(Users, Preferences) {
        let scheduledItems = [...Users];
    
        // Sort Users by class_time to ensure order
        scheduledItems.sort((a, b) => timeToMinutes(a.class_time) - timeToMinutes(b.class_time));
    
        Preferences.forEach((preference) => {
            let taskDuration = preference.duration * 60; // Convert hours to minutes
            let inserted = false;
    
            for (let i = 0; i < scheduledItems.length - 1; i++) {
                let currentClass = scheduledItems[i];
                let nextClass = scheduledItems[i + 1];
    
                let gapStart = currentClass.class_endTime;
                let gapEnd = nextClass.class_time;
    
                if (timeDifference(gapStart, gapEnd) >= taskDuration) {
                    let taskStartTime = gapStart;
                    let taskEndTime = addTime(taskStartTime, taskDuration);
    
                    scheduledItems.push({
                        name: preference.name,
                        class_time: taskStartTime,
                        class_endTime: taskEndTime,
                        type: "Preference",
                    });
    
                    inserted = true;
                    break;
                }
            }
    
            // If no gap was found, try inserting after the last class of the day
            if (!inserted && scheduledItems.length > 0) {
                let lastClass = scheduledItems[scheduledItems.length - 1];
                let lastEndTime = lastClass.class_endTime;
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
        });
    
        // Re-sort the schedule after adding preferences
        return scheduledItems.sort((a, b) => timeToMinutes(a.class_time) - timeToMinutes(b.class_time));
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
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
    }
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
        {schedule.length === 0 ? (
          <p>No events scheduled for today!</p>
        ) : (
          schedule.map((event, index) => (
            <div key={index} className="p-3 mb-2 rounded-md shadow-md bg-gray-100">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-600">
              {formatTime(event.class_time)} - {formatTime(event.class_endTime)}
              </p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  event.type === "Preference" ? "bg-green-300 text-green-800" : "bg-blue-300 text-blue-800"
                }`}
              >
                {event.type === "Preference" ? "Preference" : "Class"}
              </span>
            </div>
          ))
        )}
      </div>
    );
}
