import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";

const Vehicles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicles data from your API using axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles data:", error);
      });
  }, []);

  const columns = [
    { field: "RegNo", headerName: "Registration Number", flex: 1 },
    { field: "ResidentID", headerName: "Resident ID", flex: 1 },
    { field: "Type", headerName: "Vehicle Type", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Vehicles" />
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
          "& .css-1vsceu5": {
            marginTop: "8px",
          },
          "& .css-v6p845": {
            marginTop: "8px",
          },
        }}
      >
        <DataGrid
          rows={vehicles}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[]}
          getRowId={(row) => row.RegNo}
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

export default Vehicles;