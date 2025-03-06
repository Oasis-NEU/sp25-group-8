import * as React from 'react';
import { useState } from 'react';
import { supabase } from "../supabaseClient";
export default function ClassInfo(){
   const [startTime, setStartTime] = useState('');
   const [endTime, setEndTime] = useState('');
   const [location, setLocation] = useState('');
   const [user, setUser] = useState([]);

   async function addUser(startTime, endTime, location) {
    try {
      const { data, error } = await supabase
        .from("Users")
        .insert({ class_time: startTime, class_endTime: endTime, class_location: "hello"})
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
    return (
        <div>
          <form>
            <label>
                What time is your class?
                <input
                type = "time"
                value = {startTime}
                onChange = {(e) => setStartTime(e.target.value)}
                />
            </label>
          </form>
          <form>
            <label>
                What time does your class end?
                <input
                type = "time"
                value = {endTime}
                onChange = {(e) => setEndTime(e.target.value)}
                />
            </label>
          </form>
          <label>
            Where is your class?
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="East Village">East Village</option>
          <option value="EXP">EXP</option>
          <option value="ISEC">ISEC</option>
          <option value="Richards">Richards</option>
          <option value="Ell Hall">Ell Hall</option>
          <option value="Churchill">Churchill</option>
          <option value="West Village">West Village</option>
          <option value="Robinson">Robinson</option>
          <option value="Mugar Life Sciences">Mugar Life Sciences</option>
          <option value="International Village">International Village</option>
          <option value="Behrakis">Behrakis</option>
            </select>
          </label>
          <button onClick={() => addUser(startTime, endTime, location)}>Add Class</button>
        </div>
    )
}