import * as React from 'react';
import Button from '@mui/material/Button';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Stack from '@mui/material/Stack';

export default function HomeButton({onClick}) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<ScheduleIcon />} onClick={onClick}>
                Click here to input your schedule!
            </Button>
        </Stack>
    );
}