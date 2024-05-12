import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const VehiclesForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3000/vehicles", {
        RegNo: values.registrationNumber,
        ResidentID: values.residentId,
        Type: values.vehicleType,
      });
      console.log(response.data);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Vehicle Registration" subtitle="Register a New Vehicle" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Resident ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.residentId}
                name="residentId"
                error={!!touched.residentId && !!errors.residentId}
                helperText={touched.residentId && errors.residentId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Registration Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registrationNumber}
                name="registrationNumber"
                error={
                  !!touched.registrationNumber && !!errors.registrationNumber
                }
                helperText={
                  touched.registrationNumber && errors.registrationNumber
                }
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Vehicle Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicleType}
                name="vehicleType"
                error={!!touched.vehicleType && !!errors.vehicleType}
                helperText={touched.vehicleType && errors.vehicleType}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Two-Wheeler">Two-Wheeler</MenuItem>
                <MenuItem value="Four-Wheeler">Four-Wheeler</MenuItem>
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register Vehicle
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  residentId: yup.string().required("required"),
  registrationNumber: yup.string().required("required"),
  vehicleType: yup.string().required("required"),
});
const initialValues = {
  residentId: "",
  registrationNumber: "",
  vehicleType: "",
};

export default VehiclesForm;