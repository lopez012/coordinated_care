import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Grid, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';

const EditAppointment = ({ setCurrentAppointmentPage, patientId, currentAppointment }) => {
	let appointmentData = {
		dateTime: currentAppointment.dateTime,
		providerAssigned: currentAppointment.providerAssigned,
		typeOfProcedure: currentAppointment.typeOfProcedure,
		status: currentAppointment.status,
	}
	const parsedCurrentAppointmentDateTime = dayjs(appointmentData.dateTime, "MM/DD/YYYY hh:mm A");
	const [selectedDateTime, setSelectedDateTime] = useState(parsedCurrentAppointmentDateTime);
	const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
		data.dateTime = dayjs(selectedDateTime).format('MM/DD/YYYY hh:mm A');
		appointmentData = {
			dateTime: data.dateTime,
			providerAssigned: data.physician || currentAppointment.providerAssigned,
			typeOfProcedure: data.procedure,
			status: data.status,
			_id: currentAppointment._id,
		}
		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.put(`${baseURL}/api/patients/update_appointment/${patientId}`, appointmentData);
			console.log('Appointment updated:', response.data);
		} catch (error) {
			// Handle errors
			console.error('Error updating appointment:', error);
		}

		setCurrentAppointmentPage("AllAppointments");
    };


    const [physicians, setPhysicians] = useState([]);
	const [inputPhysician, setInputPhysician] = useState("");
    useEffect(() => {
		const fetchPhysicians = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/employees/all_physician_names`);
				setPhysicians(response.data);
				setInputPhysician(appointmentData.providerAssigned);
			} catch (error) {
				console.error("Fetching physicians failed: ", error);
			}
		};

		fetchPhysicians();
	}, []);

	

	return (
        <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
                Edit Appointment
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl fullWidth>
                    <InputLabel id="physician-label">Physician*</InputLabel>
                    <Select
                        labelId="physician-label"
                        id="physician-select"
                        label="Physician"
                        required
						value={inputPhysician}
                        {...register("physician")}
                    >
                        {physicians.map((physician) => (
                            <MenuItem key={physician.id} value={physician.id} onClick={() => setInputPhysician(physician.id)}>
                                {physician.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Type of Procedure"	
                    {...register("procedure", { required: "Procedure Type is required" })}
                    margin="normal"
					defaultValue={currentAppointment.typeOfProcedure}
                    required
                />

                <FormControl fullWidth>
                    <InputLabel id="status-label">Status*</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-select"
                        label="Status"
						defaultValue="Pending"
						{...register("status", { required: "Stauts is required" })}
                        required
                    >
                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginTop: 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            labelId="datetime-label"
                            id="datetime-select"
                            label="Date and Time*"
                            required
							value={selectedDateTime}
                            onChange={setSelectedDateTime}
                            renderInput={(props) => <TextField {...props} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: 2 }}>
					<Button type="submit" variant="contained" color="primary" sx={{ width: "100px" }}>
                        Save
                    </Button>
					<Button onClick={() => setCurrentAppointmentPage("AllAppointments")} variant="contained" color="error" sx={{ width: "100px" }}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
export default EditAppointment;
