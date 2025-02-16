import { useState } from 'react'
import ContainedButtons from '../components/HomeButton.jsx'
import './SchedulePage.css'
import addButton from '../components/addButton.jsx'
import classInfo from '../components/classInfo.jsx'
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    const nav = useNavigate();
    return (
        <>
            <h1> Input your schedule here! </h1>
            <addButton onClick={() => classInfo}/>
            <ContainedButtons onClick={() => nav('/preferences')} />
        </>

    )
}
export default SchedulePage
