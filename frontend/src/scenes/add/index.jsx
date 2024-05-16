import React, { useState } from "react";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import Header from "../../components/Header";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ResidentsForm from "./ResidentsForm"; // Import the ResidentsForm component
import MaintainenceForm from "./MaintainenceForm"; // Import the MaintainenceForm component
import ComplaintsForm from "./ComplaintsForm"; // Import the ComplaintsForm component
import FinesForm from "./FinesForm"; // Import the FinesForm component
import VehiclesForm from "./VehiclesForm"; // Import the VehiclesForm component
import { useUser } from "../../useUser"; // Import useUser hook

const Add = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("Select Table");
  const userContext = useUser(); // Use the useUser hook to access user context

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="Add" subtitle="Select Table to Add Data"></Header>
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel
          id="demo-simple-select-outlined-label"
          notched={Boolean(selectedOption)}
        >
          Tables
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedOption}
          onChange={handleChange}
          label="Options"
        >
          {userContext.userData.userType === "admin" && (
            <MenuItem value={"Residents"}>Residents</MenuItem>
          )}
          {userContext.userData.userType === "admin" && (
            <MenuItem value={"Maintainence"}>Maintenance</MenuItem>
          )}
          {userContext.userData.userType === "admin" && (
            <MenuItem value={"Complaints"}>Complaints</MenuItem>
          )}
          {userContext.userData.userType === "admin" && (
            <MenuItem value={"Fines"}>Fines</MenuItem>
          )}
          {userContext.userData.userType === "admin" && (
            <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
          )}
          {userContext.userData.userType !== "admin" && (
            <MenuItem value={"Complaints"}>Complaints</MenuItem>
          )}
        </Select>
      </FormControl>
      {selectedOption === "Residents" && <ResidentsForm />}
      {selectedOption === "Maintainence" && <MaintainenceForm />}
      {selectedOption === "Complaints" && <ComplaintsForm />}
      {selectedOption === "Fines" && <FinesForm />}
      {selectedOption === "Vehicles" && <VehiclesForm />}
    </Box>
  );
};

export default Add;