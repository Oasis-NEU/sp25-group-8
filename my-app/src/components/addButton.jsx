import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

export default function addButton(message) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<ScheduleIcon />}>
                message
            </Button>
        </Stack>
    );
}