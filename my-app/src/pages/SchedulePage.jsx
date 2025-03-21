import { useState } from 'react';
import ContainedButtons from '../components/ContainedButtons.jsx';
import './SchedulePage.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { supabase } from "../supabaseClient";

const locations = [
    "EXP", "ISEC", "Richards", "Ell Hall", "Churchill", "West Village", "Robinson",
    "Mugar Life Sciences", "International Village", "Behrakis", "East Village",
    "Stetson East", "Stetson West", "Hayden Hall", "Hastings Hall", "Holmes Hall",
    "Hurtig Hall", "Hillel-Frager", "OBryant African American Institute", "Alumni Center",
    "Architecture Studio", "Kariotis Hall", "Asian American Center", "Knowles Center",
    "Barletta Natatorium", "Lake Hall", "Behrakis Health Sciences Center",
    "Latinx Student Cultural Center", "Belvidere Place", "Marino Recreation Center",
    "Blackman Auditorium", "Cabot Physical Education Center", "Matthews Arena",
    "Cahners Hall", "Nightingale Hall", "Cargill Hall", "Catholic Center",
    "Churchill Hall", "Columbus Place", "Cullinane Hall", "Curry Student Center",
    "ROTC Office", "Cushing Hall", "Ryder Hall", "Dana Research Center",
    "Shillman Hall", "Dockser Hall", "Snell Engineering Center", "Dodge Hall",
    "Snell Library", "Badger & Rosen", "Egan Research Center", "Forsyth Building"
];


function SchedulePage() {
    const nav = useNavigate();
    const [classes, setClasses] = useState([
        { name: '', startTime: '', endTime: '', location: '' }
    ]);

    const handleChange = (index, field, value) => {
        const updatedClasses = [...classes];
        updatedClasses[index][field] = value;
        setClasses(updatedClasses);
    };

    const addClass = () => {
        setClasses([...classes, { name: '', startTime: '', endTime: '', location: '' }]);
    };

    const removeClass = (index) => {
        const updatedClasses = [...classes];
        updatedClasses.splice(index, 1);
        setClasses(updatedClasses);
    };

    const formatTime = (time) => {
        return time.length === 5 ? `${time}:00` : time;
    };

    const saveClass = async (cls) => {
        try {
            const { data, error } = await supabase
                .from("Users")
                .insert({
                    name: cls.name,
                    class_time: formatTime(cls.startTime),
                    class_endTime: formatTime(cls.endTime),
                    class_location: cls.location
                })
                .single();
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    return (
        <>
            <h1>Input your schedule here!</h1>
            {classes.map((cls, index) => (
                <Card key={index} sx={{ marginBottom: 3, padding: 2 }}>
                    <CardContent>
                        <TextField
                            label="Class Name"
                            value={cls.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <label>Class Start Time</label>
                        <TextField
                            type="time"
                            value={cls.startTime}
                            onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <label>Class End Time</label>
                        <TextField
                            type="time"
                            value={cls.endTime}
                            onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Location</InputLabel>
                            <Select
                                value={cls.location}
                                label="Location"
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                            >
                                {locations.map((loc) => (
                                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <IconButton onClick={() => removeClass(index)}>
                            <Delete />
                        </IconButton>

                        <Button variant="contained" onClick={() => saveClass(cls)}>
                            Save Class
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <Button variant="outlined" onClick={addClass}>Add Another Class</Button>

            <ContainedButtons
                message='Choose your preferences!'
                onClick={() => nav('/preferences')}
            />
        </>
    );
}

export default SchedulePage;
