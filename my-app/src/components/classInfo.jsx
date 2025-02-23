import * as React from 'react';
import { useState } from 'react';
export default function ClassInfo(){
   const [startTime, setStartTime] = useState('');
   const [endTime, setEndTime] = useState('');
   const [location, setLocation] = useState('');
   const [user, setUser] = useState([]);
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
                <option value = "East Village">EastVillage</option>
                <option value = "EXP">EXP</option>
                <option value = "ISEC">ISEC</option>
                <option value = "Richards">Richards</option>
                <option value = "Ell Hall">EllHall</option>
                <option value = "Churchill">Churchill</option>
                <option value = "West Village">WestVillage</option>
                <option value = "Robinson">Robinson</option>
                <option value = "Mugar Life Sciences">Mugar</option>
                <option value = "International Village">International</option>
                <option value = "Behrakis">Behrakis</option>
            </select>
          </label>
        </div>
    )
}