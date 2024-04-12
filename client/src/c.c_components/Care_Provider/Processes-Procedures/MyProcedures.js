import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const MyProcedures = ({ setCurrentPage }) => {
	const procedures = [
		{ id: 1, name: "Knee Replacement", patient: "John Doe", date: "2024-04-15" },
		{ id: 2, name: "Hip Replacement", patient: "Jane Smith", date: "2024-04-18" },
		{ id: 3, name: "Cataract Surgery", patient: "Edward Wilson", date: "2024-04-20" },
	];

	const handleNewProcedureClick = () => {
		setCurrentPage("Create_new_procedure");
	};

	return (
		<TableContainer component={Paper}>
			<Typography variant="h6" component="div" sx={{ padding: 2 }}>
				My Assigned Procedures
			</Typography>
			<Button variant="contained" onClick={handleNewProcedureClick} sx={{ ml: 2 }}>
				Create New Procedure
			</Button>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Procedure Name</TableCell>
						<TableCell>Patient</TableCell>
						<TableCell>Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{procedures.map((procedure) => (
						<TableRow key={procedure.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell component="th" scope="row">
								<span
									onClick={() => setCurrentPage("EditProcedure")}
									style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
									role="button"
								>
									{procedure.name}
								</span>
							</TableCell>
							<TableCell>{procedure.patient}</TableCell>
							<TableCell>{procedure.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MyProcedures;
