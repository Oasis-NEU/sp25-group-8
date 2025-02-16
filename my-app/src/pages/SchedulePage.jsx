import { useState } from 'react'
import ContainedButtons from '../components/HomeButton.jsx'
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    const nav = useNavigate();
    return (
        <>
            <h1> Welcome to NUDailyPlanner! </h1>
            <ContainedButtons onClick={() => nav('/preferences')} />
        </>

    )
}
// this is a test
export default SchedulePage