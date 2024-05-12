import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // Import axios for API calls

const ComplaintsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      // Make API call to update individual complaint record
      await axios.put(
        `http://localhost:3000/complaints/${values.complaintID}`,
        values
      );
      console.log("Complaint record updated successfully");
    } catch (error) {
      console.error("Error updating complaint record:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Complaints" subtitle="Manage Complaints for a Resident" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={individualUpdateInitialValues}
        validationSchema={individualUpdateSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Complaint ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.complaintID}
                name="complaintID"
                error={!!touched.complaintID && !!errors.complaintID}
                helperText={touched.complaintID && errors.complaintID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Resident ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.residentID}
                name="residentID"
                error={!!touched.residentID && !!errors.residentID}
                helperText={touched.residentID && errors.residentID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Reported"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateReported}
                name="dateReported"
                error={!!touched.dateReported && !!errors.dateReported}
                helperText={touched.dateReported && errors.dateReported}
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit Complaint
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const individualUpdateSchema = yup.object().shape({
  complaintID: yup.string().required("Complaint ID is required"),
  residentID: yup.string(),
  description: yup.string(),
  dateReported: yup.date(),
  status: yup.string(),
});

const individualUpdateInitialValues = {
  complaintID: "",
  residentID: "",
  description: "",
  dateReported: "",
  status: "",
};

export default ComplaintsForm;
