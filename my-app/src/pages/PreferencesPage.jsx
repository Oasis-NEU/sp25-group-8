import { useState } from 'react';
import './PreferencesPage.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Delete } from "@mui/icons-material";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// have to change logic once database is confirmed to send inputted data and make schedule
function PreferencesPage() {
    const nav = useNavigate();
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        setTasks([...tasks, { name: "", occurrence: [], duration: "" }]);
    };

    const updateTask = (index, field, value) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, [field]: value } : task
        );
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <>
            <h1> Along with study time, eating time, and relaxation time, please list any other activities you would like to do! </h1>

            {tasks.map((task, index) => (
                <Card key={index} sx={{ marginBottom: 5, padding: 2 }}>
                    <CardContent>
                        <TextField
                            label="Task Name"
                            value={task.name}
                            onChange={(e) => updateTask(index, "name", e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        {/* Multi-Select Dropdown for Days */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Days</InputLabel>
                            <Select
                                multiple
                                value={task.occurrence}
                                onChange={(e) => updateTask(index, "occurrence", e.target.value)}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {daysOfWeek.map((day) => (
                                    <MenuItem key={day} value={day}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Numeric Input for Duration */}
                        <TextField
                            label="Duration (hours)"
                            type="number"
                            value={task.duration}
                            onChange={(e) => updateTask(index, "duration", e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <IconButton onClick={() => removeTask(index)}>
                            <Delete />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}

            <Button variant="contained" onClick={addTask} sx={{ marginTop: 2 }}>
                Add Task
            </Button>
        </>
    );
}

export default PreferencesPage;