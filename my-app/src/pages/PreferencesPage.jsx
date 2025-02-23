import { useState } from 'react'
import './PreferencesPage.css'
import { useNavigate } from 'react-router-dom';

function PrefencesPage() {

    const nav = useNavigate();
    return (
        <>
            <h1 style={{ fontSize: '24px', color: '#4a90e2', fontFamily: 'Monaco, monospace' }}>
                Along with study time, eating time, and relaxation time,
                please list any other activities you would like to do!
            </h1>
            <p className="info">
                Our goal is to help first-years plan their days in college!
            </p>
        </>
    )
}
// this is a test
export default PrefencesPage