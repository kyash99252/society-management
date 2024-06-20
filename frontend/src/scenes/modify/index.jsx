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
import ResidentsForm from "./ResidentsForm";
import MaintainenceForm from "./MaintainenceForm";
import ComplaintsForm from "./ComplaintsForm";
import FinesForm from "./FinesForm";
import VehiclesForm from "./VehiclesForm";
import { useUser } from "../../useUser";

const Update = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("Select Table");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="Update" subtitle="Select Table to Update Data"></Header>
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
          <MenuItem value={"Residents"}>Residents</MenuItem>
          <MenuItem value={"Maintainence"}>Maintainence</MenuItem>
          <MenuItem value={"Complaints"}>Complaints</MenuItem>
          <MenuItem value={"Fines"}>Fines</MenuItem>
          <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
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

export default Update;