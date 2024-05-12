import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // Import axios for API calls

const MaintenanceForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      // Make API call to update individual maintenance record
      await axios.put(`http://localhost:3000/maintenence/${values.maintenanceID}`, values);
      console.log("Maintenance record updated successfully");
    } catch (error) {
      console.error("Error updating maintenance record:", error);
    }
  };

  const handleMonthlyUpdateSubmit = async (values) => {
    try {
      // Make API call to update due date for all maintenance records
      await axios.put("http://localhost:3000/maintenance/monthly", values);
      console.log("Monthly maintenance records updated successfully");
    } catch (error) {
      console.error("Error updating monthly maintenance records:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Maintenance"
        subtitle="Manage Maintenance for a Resident"
      />

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
                label="Maintenance ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maintenanceID}
                name="maintenanceID"
                error={!!touched.maintenanceID && !!errors.maintenanceID}
                helperText={touched.maintenanceID && errors.maintenanceID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
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
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending Payment">Pending Payment</MenuItem>
              </TextField>
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
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Due Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dueDate}
                name="dueDate"
                error={!!touched.dueDate && !!errors.dueDate}
                helperText={touched.dueDate && errors.dueDate}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit Maintenance
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Header
        title="Monthly Update"
        subtitle="Update Maintenance for All Residents"
      />

      <Formik
        onSubmit={handleMonthlyUpdateSubmit}
        initialValues={monthlyUpdateInitialValues}
        validationSchema={monthlyUpdateSchema}
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
                type="date"
                label="Due Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dueDate}
                name="dueDate"
                error={!!touched.dueDate && !!errors.dueDate}
                helperText={touched.dueDate && errors.dueDate}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update All
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const individualUpdateSchema = yup.object().shape({
  maintenanceID: yup.string().required("Maintenance ID is required"),
  status: yup.string(),
  residentID: yup.string(),
  amount: yup.number(),
  dueDate: yup.date(),
});

const individualUpdateInitialValues = {
  maintenanceID: "",
  status: "",
  residentID: "",
  amount: "",
  dueDate: "",
};

const monthlyUpdateSchema = yup.object().shape({
  dueDate: yup.date().required("Due Date is required"),
});

const monthlyUpdateInitialValues = {
  dueDate: "",
};

export default MaintenanceForm;
