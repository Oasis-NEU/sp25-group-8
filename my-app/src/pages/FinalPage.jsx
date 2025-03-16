import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { createClient } from "@supabase/supabase-js";

export default function DailySchedule() {
    const [schedule, setSchedule] = useState([]);
  
    useEffect(() => {
      async function fetchSchedule() {
        const today = new Date().toISOString().split("T")[0]; // Get today's date
  
        // Fetch classes
        const { data: Users, error: classError } = await supabase
          .from("Users")
          .select("*")
          .gte("class_time", today)
          .lte("class_time", `${today}T23:59:59`)
          .order("class_endTime", { ascending: true });
  
        if (classError) console.error("Error fetching classes:", classError);
  
        // Fetch tasks (user-defined tasks)
        const { data: Preferences, error: taskError } = await supabase
          .from("Preferences")
          .select("*")
          .order("duration", { ascending: true });
  
        if (taskError) console.error("Error fetching tasks:", taskError);
  
        // Merge classes and tasks into a schedule
        const mergedSchedule = generateSchedule(Users, Preferences);
        setSchedule(mergedSchedule);
      }
  
      fetchSchedule();
    }, []);
  
    function generateSchedule(Users, Preferences) {
      let scheduledItems = [...Users]; // Start with classes
      let availableTime = new Date(Users[0]?.class_time || "08:00"); // Start the day at 8 AM if no classes
  
      tasks.forEach((Preferences) => {
        let taskDurationMs = Preferences.duration * 60 * 60 * 1000; // Convert hours to milliseconds
  
        // Find gaps between classes
        for (let i = 0; i <= scheduledItems.length; i++) {
          let currentClass = scheduledItems[i];
          let nextClass = scheduledItems[i + 1];
  
          let gapStart = currentClass ? new Date(currentClass.class_endTime) : availableTime;
          let gapEnd = nextClass ? new Date(nextClass.class_time) : new Date("23:59:59"); // End of the day
  
          if (gapEnd - gapStart >= taskDurationMs) {
            let taskStartTime = new Date(gapStart);
            let taskEndTime = new Date(taskStartTime.getTime() + taskDurationMs);
  
            scheduledItems.push({
              name: Preferences.name,
              class_time: taskStartTime.toISOString(),
              class_endTime: taskEndTime.toISOString(),
              type: "Preferences",
            });
  
            availableTime = taskEndTime;
            break; // Move to the next task
          }
        }
      });
  
      return scheduledItems.sort((a, b) => new Date(a.class_time) - new Date(b.class_time));
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
                {new Date(event.class_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                {new Date(event.class_endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  event.type === "task" ? "bg-green-300 text-green-800" : "bg-blue-300 text-blue-800"
                }`}
              >
                {event.type === "task" ? "Task" : "Class"}
              </span>
            </div>
          ))
        )}
      </div>
    );
  }