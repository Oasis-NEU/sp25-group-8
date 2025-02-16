import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

export default function AddButton({message, onClick}) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<AddIcon />}  onClick={onClick}>
                {message}
            </Button>
        </Stack>
    );
}