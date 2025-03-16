import { useState } from 'react'
import './HomePage.css'
import HomeButton from '../components/HomeButton.jsx'
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabaseClient";
function HomePage() {
    const nav = useNavigate();
    return (
        <main className="home-container">
            <h1>Welcome to NUDailyPlanner!</h1>
            <p className="info">
                Our goal is to help first-years plan their days in college!
            </p>
            <HomeButton onClick={() => nav('/schedule')} />
        </main>
    );


}
// this is a test
export default HomePage
