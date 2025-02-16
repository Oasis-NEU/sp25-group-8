import { useState } from 'react'
import ContainedButtons from '../components/HomeButton.jsx'
import './SchedulePage.css'
import AddButton from '../components/addButton.jsx'
import ClassInfo from '../components/classInfo.jsx'
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    const [showClassInfo, setShowClassInfo] = useState(false);
    const nav = useNavigate();
    return (
        <>
            <h1> Input your schedule here! </h1>
            <AddButton message='Click here to add a Class' 
            onClick={() => setShowClassInfo(!showClassInfo)}/>
            {showClassInfo && <ClassInfo />}
            <h1> Input your schedule here! </h1>
            <addButton onClick={() => classInfo}/>
            <ContainedButtons onClick={() => nav('/preferences')} />
        </>

    )
}
export default SchedulePage
