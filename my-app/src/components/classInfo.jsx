import * as React from 'react';

export default function classInfo(){
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
                <option value = "Richards">EastVillage</option>
                <option value = "Ell Hall">EastVillage</option>
                <option value = "Churchill">EastVillage</option>
                <option value = "West Village">EastVillage</option>
                <option value = "Robinson">EastVillage</option>
                <option value = "Mugar Life Sciences">EastVillage</option>
                <option value = "International Village">EastVillage</option>
            </select>
          </label>
        </div>
    )
}