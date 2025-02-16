import { useState } from 'react'
import './SchedulePage.css'
import addButton from '../components/addButton.jsx'
import classInfo from '../components/classInfo.jsx'
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    return (
        <>
            <h1> Input your schedule here! </h1>
            <addButton onClick={() => classInfo}/>
        </>
    )
}
export default SchedulePage
