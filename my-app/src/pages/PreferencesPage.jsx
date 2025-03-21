import { useState } from 'react';
import './PreferencesPage.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { supabase } from "../supabaseClient";
import ContainedButtons from '../components/ContainedButtons.jsx';


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


// have to change logic once database is confirmed to send inputted data and make schedule
function PreferencesPage() {
   const nav = useNavigate();
   const [name, setName] = useState('');
   const [duration, setDuration] = useState('');


   async function addTask(name, duration) {
       try {
         const { data, error } = await supabase
           .from("Preferences")
           .insert({ name: name, duration: duration})
           .single();
         if (error) throw error;
         window.location.reload();
       } catch (error) {
         alert(error);
         console.log(error);
       }
     }
   return (
       <>
           <h1> Along with study time, eating time, and relaxation time, please list any other activities you would like to do! </h1>
               <Card sx={{ marginBottom: 5, padding: 2 }}>
                   <CardContent>
                       <TextField
                           label="Task Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           fullWidth
                           margin="normal"
                       />


                       {/* Numeric Input for Duration */}
                       <TextField
                           label="Duration (hours)"
                           type="number"
                           value={duration}
                           onChange={(e) => setDuration(e.target.value)}
                           fullWidth
                           margin="normal"
                       />


                       <IconButton onClick={() => removeTask(index)}>
                           <Delete />
                       </IconButton>
                   </CardContent>
               </Card>
               <button onClick={() => addTask(name, duration)}>Add Task</button>
               <ContainedButtons
                message='See your final Schedule!'
                onClick={() => nav('/final')} />
       </>
   );
}


export default PreferencesPage;