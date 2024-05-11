import { useState, useEffect } from 'react'
import { Box, Toolbar, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme'
import axios from 'axios';
import Header from "../../components/Header";

const Residents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [residents, setResidents] = useState([]);

  // Fetch residents data from your API using axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        setResidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching residents data:", error);
      });
  }, []);

  const columns = [
    { field: "ResidentID", headerName: "ID", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "FlatNo", headerName: "Flat", flex: 1 },
    { field: "OccupancyStatus", headerName: "Status", flex: 1 },
    { field: "ContactNumber", headerName: "Ph. No.", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Residents" subtitle="Manage the Residents" />
      <Box
        m="40px 0 0 0"
        height="71vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .css-4310zs-MuiDataGrid-root .MuiDataGrid-container--top [role=row]":
            {
              backgroundColor: colors.blueAccent[700],
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .css-1dahqh6-MuiButtonBase-root-MuiButton-root": {
            color: "#ffffff",
          },
        }}
      >
        <DataGrid
          rows={residents}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[]}
          getRowId={(row) => row.ResidentID}
          slots={{ toolbar: GridToolbar }}
          sx={{
            "@media print": {
              ".MuiDataGrid-cell": {
                backgroundColor: "transparent !important",
              },
              ".MuiDataGrid-columnsContainer": {
                display: "none !important",
              },
              ".MuiDataGrid-main": {
                width: "fit-content !important",
                fontSize: "10px !important",
                height: "fit-content !important",
                overflow: "visible !important",
                color: "#000000",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Residents;