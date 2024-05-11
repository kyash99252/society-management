import { useState, useEffect } from "react";
import { Box, Toolbar, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";

const Maintenance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [residents, setResidents] = useState([]);

  // Fetch residents data from your API using axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/maintenence")
      .then((response) => {
        setResidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching residents data:", error);
      });
  }, []);

  const columns = [
    { field: "MaintainenceID", headerName: "Maintenance ID", flex: 1 },
    { field: "ResidentID", headerName: "Resident ID", flex: 1 },
    { field: "Amount", headerName: "Amount", flex: 1 },
    { field: "DueDate", headerName: "Due Date", flex: 1 },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            value === "Paid" ? colors.greenAccent[500] : colors.redAccent[500]
          }
          borderRadius="4px"
        >
          <Typography color={colors.grey[100]}>{value}</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Maintainence" />
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
          rows={residents}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[]}
          getRowId={(row) => row.MaintainenceID}
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

export default Maintenance;
