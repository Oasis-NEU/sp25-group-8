import { useState } from 'react'
import './HomePage.css'
import HomeButton from '../components/HomeButton.jsx'


function HomePage() {
   
    
    return (
        <>
            <h1> Welcome to NUDailyPlanner! </h1>
            <p className="info">
                Our goal is to help first-years plan their days in college!
            </p>
            <HomeButton />
        </>
    )
}
// this is a test
export default HomePage
