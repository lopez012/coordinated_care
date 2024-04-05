import React from 'react'

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function Faculty_Staff( {setCurrentPage, setCurrentFacultyInformation} ) {
    const [searchTerm, setSearchTerm] = React.useState('');
      
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const columns = [
        { field: 'id', headerName: 'E.id', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          width: 90,
        },
        {
          field: 'role',
          headerName: 'Role',
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
          renderCell: (params) => (
            <span
                style={{
                    textDecoration: 'underline',
                    color: 'dodgerblue',
                    cursor: 'pointer',
                }}
                onClick={() => {
                  setCurrentPage('Faculty Information');
                  setCurrentFacultyInformation(params.row);
                }}
            >
                {params.value}
            </span>
        ),
        },
      ];
      
      const rows = [
        { id: 1322323, lastName: 'Snow', firstName: 'Jon', phoneNumber: 35423323, role: 'Doctor' },
        { id: 2323232, lastName: 'Lannister', firstName: 'Cersei', phoneNumber: 42323232, role: 'Medical Assistant' },
        { id: 332323, lastName: 'Lannister', firstName: 'Jaime', phoneNumber: 45232323, role: 'Doctor' },
        { id: 493993, lastName: 'Stark', firstName: 'Arya', phoneNumber: 163232323, role: 'Medical Assistant' },
        { id: 5333233, lastName: 'Targaryen', firstName: 'Daenerys', phoneNumber: 32323232, role: 'Doctor' },
        { id: 6323223, lastName: 'Melisandre', firstName: null, phoneNumber: 3232232,role: 'Medical Assistant' },
        { id: 7323232, lastName: 'Clifford', firstName: 'Ferrara', phoneNumber: 43232324, role: 'Doctor' },
        { id: 82323, lastName: 'Frances', firstName: 'Rossini', phoneNumber: 33232326, role: 'Doctor' },
        { id: 932323, lastName: 'Roxie', firstName: 'Harvey', phoneNumber: 6323232323, role: 'Doctor' },
      ];

    const setAddNewFacultyScreen = () => {
      setCurrentPage('Add New Faculty');
    };

    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'centered', mb: 2 }}>
        <TextField
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            sx={{ width: '40%' }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" sx={{ ml: 6 }} onClick={setAddNewFacultyScreen}>Add New Faculty/Staff</Button>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          </>
          );
}
