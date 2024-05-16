import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import { useUser } from "../../useUser"; // Import useUser hook

const Complaints = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [complaints, setComplaints] = useState([]);
  const userContext = useUser(); // Use the useUser hook to access user context

  useEffect(() => {
    // Fetch complaints data based on user role
    if (userContext && userContext.userData) {
      if (userContext.userData.userType === "admin") {
        // Fetch all complaints for admin
        axios
          .get("http://localhost:3000/complaints")
          .then((response) => {
            setComplaints(response.data);
          })
          .catch((error) => {
            console.error("Error fetching complaints data:", error);
          });
      } else if (userContext.userData.userType === "user") {
        // Fetch complaints for the current user
        axios
          .get(
            `http://localhost:3000/complaints/${userContext.userData.residentID}`
          )
          .then((response) => {
            console.log(userContext.userData.residentID)
            setComplaints(response.data);
          })
          .catch((error) => {
            console.error("Error fetching complaints data:", error);
          });
      }
    }
  }, [userContext]); // Fetch complaints data whenever userContext changes

  const columns = [
    { field: "ComplaintID", headerName: "Complaint ID", flex: 0.5 },
    { field: "ResidentID", headerName: "Resident ID", flex: 0.5 },
    { field: "Description", headerName: "Description", flex: 1 },
    { field: "DateReported", headerName: "Date Reported", flex: 1 },
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
            value === "Pending"
              ? colors.redAccent[500]
              : value === "In Progress"
              ? "#FFE684"
              : colors.greenAccent[500]
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
      <Header title="Complaints" />
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
          rows={complaints}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[]}
          getRowId={(row) => row.ComplaintID}
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

export default Complaints;