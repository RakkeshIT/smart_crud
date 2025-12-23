'use client'
import { Container, Grid, Box, Typography, TextField, Autocomplete, Icon } from '@mui/material'
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { Autorenew, CheckCircle, DeleteOutline, HourglassEmpty, PauseCircle } from '@mui/icons-material';
export const premiumBlueStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 0,
        "& fieldset": { borderColor: "#ABB1BA" }, // default border
        "&:hover fieldset": { borderColor: "#003D99" }, // hover border
        "&.Mui-focused fieldset": { borderColor: "#003D99", borderWidth: 2 }, // focus border
    },
    "& .MuiInputLabel-root": {
        color: "#000", // label default
        "&.Mui-focused": { color: "#003D99" }, // label focus
    },
};

const statusOption = [
    {value: 'Not Started', icon: <HourglassEmpty/>, color: 'grey'},
    {value: 'In Progress', icon: <Autorenew/>, color: 'blue'},
    {value: 'On Hold', icon: <PauseCircle/>, color: 'orange'},
    {value: 'Completed', icon: <CheckCircle/>, color: 'green'},
    {value: 'Cancelled', icon: <DeleteOutline/>, color: 'red'},
]
const JobSeekers = () => {
    const [field, setField] = useState<string[]>(Array(5).fill(''));

    const handleAddField = () => {
        setField([...field, '']);
    }
    const handleRemoveField = (i: number) => {
        setField(prev => prev.filter((_, index) => index !== i))
    }
    return (
        <Grid container spacing={3} >
                <Grid
                    size={{ xs: 12, md: 4 }}                   
                    sx={{
                        backgroundColor: "white", // white background
                        p: 3, // padding
                        borderRadius: 2, // rounded corners
                        boxShadow: 3, // optional shadow to make it "thick"
                        display: "flex",
                        flexDirection: "column", // flex column
                        gap: 2, // spacing between elements
                    }}
                >
                    <Typography color='primary.main' fontWeight='bold'>Select Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <DatePicker
                                    label="Start Date"
                                    slotProps={{
                                        textField: { sx: premiumBlueStyle },
                                    }}
                                />
                                <DatePicker
                                    label="End Date"
                                    slotProps={{
                                        textField: { sx: premiumBlueStyle },
                                    }}
                                />
                            </Box>
                        </DemoContainer>
                    </LocalizationProvider>


                </Grid>
                <Grid
                    size={{ xs: 12, md: 8 }}
                    sx={{
                        backgroundColor: "white", // white background
                        p: 3, // padding
                        borderRadius: 2, // rounded corners
                        boxShadow: 3, // optional shadow to make it "thick"
                        display: "flex",
                        flexDirection: "column", // flex column
                        gap: 2, // spacing between elements
                    }}
                >
                    <Typography color='primary.main' fontWeight='bold'>Task Name</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2, // space between items
                            alignItems: "center", // vertical alignment
                            width: "100%",
                        }}
                    >
                        {/* Task Name Input */}
                        <TextField
                            fullWidth
                            placeholder="Enter Task Name"
                            sx={{ ...premiumBlueStyle, minWidth: 250 }} // minimum width for better layout
                        />

                        {/* Autocomplete */}
                        <Autocomplete
                            disablePortal
                            options={statusOption}
                            getOptionLabel={(option) => option.value}
                            sx={{ width: 300 }} // fixed width
                            renderOption={(props, option) => (
                                <Box component='li' display='flex' alignContent='center' gap={1} {...props} color={option.color}>
                                    {option.icon}
                                    {option.value}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} label="Status" sx={premiumBlueStyle}  />}
                        />
                    </Box>
                    <Typography color='grey' fontSize={14}>
                        Please enter a descriptive task name to easily identify it later.
                    </Typography>


                </Grid>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                        backgroundColor: "white", // white background
                        p: 3, // padding
                        borderRadius: 2, // rounded corners
                        boxShadow: 3, // optional shadow to make it "thick"
                        display: "flex",
                        flexDirection: "column", // flex column
                        gap: 2, // spacing between elements
                    }}
                >
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography color='primary.main' fontWeight='bold'>Topics</Typography>
                        <ControlPointDuplicateIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={handleAddField} />
                    </Box>

                    <Box display='flex' flexDirection='column' gap={2}>
                        {
                            field.map((f, i) => (
                                <TextField
                                    key={i}
                                    sx={premiumBlueStyle}
                                    placeholder={`Topic ${i + 1}`}
                                    InputProps={{
                                        endAdornment: (
                                            <DeleteOutline
                                                onClick={() => handleRemoveField(i)}
                                                style={{ cursor: "pointer", color: "red", opacity: 0.5 }}
                                            />
                                        ),
                                    }}
                                />

                            ))
                        }
                    </Box>
                </Grid>

                   <Grid
                    size={{ xs: 12, md: 8 }}
                    sx={{
                        backgroundColor: "white", // white background
                        p: 3, // padding
                        borderRadius: 2, // rounded corners
                        boxShadow: 3, // optional shadow to make it "thick"
                        display: "flex",
                        flexDirection: "column", // flex column
                        gap: 2, // spacing between elements
                    }}
                >
                    <Typography color='primary.main' fontWeight='bold'>Sub Task <span style={{color: 'grey'}}>(Optional)</span></Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2, // space between items
                            alignItems: "center", // vertical alignment
                            width: "100%",
                        }}
                    >
                        {/* Task Name Input */}
                        <TextField
                            fullWidth
                            placeholder="Enter Sub Task Name"
                            sx={{ ...premiumBlueStyle, minWidth: 250 }} // minimum width for better layout
                        />
                    </Box>
                    <Typography color='grey' fontSize={14}>
                        Please enter a Sub task name to easily identify it later.
                    </Typography>
                    
                     <Typography color='primary.main' fontWeight='bold'>Sub Task <span style={{color: 'grey'}}>(Optional)</span></Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2, // space between items
                            alignItems: "center", // vertical alignment
                            width: "100%",
                        }}
                    >
                        {/* Task Name Input */}
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Enter Sub Task Description"
                            sx={{ ...premiumBlueStyle, minWidth: 250 }} // minimum width for better layout
                        />
                    </Box>


                </Grid>

                

            </Grid>
    )
}

export default JobSeekers