import { useState } from 'react'
import './SchedulePage.css'
import AddButton from '../components/addButton.jsx'
import ClassInfo from '../components/classInfo.jsx'
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    const [showClassInfo, setShowClassInfo] = useState(false);
    return (
        <>
            <h1> Input your schedule here! </h1>
            <AddButton message='Click here to add a Class' 
            onClick={() => setShowClassInfo(!showClassInfo)}/>
            {showClassInfo && <ClassInfo />}
        </>
    )
}
export default SchedulePage
