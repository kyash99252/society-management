import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const ComplaintsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/complaints", {
        ResidentID: values.residentID,
        Description: values.description,
        DateReported: values.dateReported,
        Status: "Pending",
      });

      if (response.data.message) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Report Complaint"
        subtitle="Report a Complaint by a Resident"
      />

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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Report Complaint
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  residentID: yup.string().required("required"),
  description: yup.string().required("required"),
  dateReported: yup.date().required("required"),
});

const initialValues = {
  residentID: "",
  description: "",
  dateReported: "",
};

export default ComplaintsForm;