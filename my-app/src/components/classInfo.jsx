import * as React from 'react';
import { useState } from 'react';
export default function ClassInfo(){
   const [inputValue, setInputValue] = useState('');
    return (
        <div>
          <form>
            <label>
                What time is your class?
                <input
                type = "time"
                value = {inputValue}
                onChange = {(e) => setInputValue(e.target.value)}
                />
            </label>
          </form>
          <label>
            Where is your class?
            <select>
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