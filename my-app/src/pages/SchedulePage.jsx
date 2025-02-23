import { useState } from 'react';
import ContainedButtons from '../components/ContainedButtons.jsx';
import './SchedulePage.css';
import AddButton from '../components/addButton.jsx';
import ClassInfo from '../components/classInfo.jsx';
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
    const [showClassInfo, setShowClassInfo] = useState(false);
    const nav = useNavigate();

    return (
        <>
            <h1>Input your schedule here!</h1>
            <AddButton
                message='Click here to add a Class'
                onClick={() => setShowClassInfo(!showClassInfo)}
            />
            {showClassInfo && <ClassInfo />}
            <div style={{ margin: '100px 0' }}></div>
            <ContainedButtons
                message='Choose your preferences!'
                onClick={() => nav('/preferences')} />
        </>
    );
}

export default SchedulePage;
