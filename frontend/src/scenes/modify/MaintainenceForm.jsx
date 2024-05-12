import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const MaintenanceForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleMonthlyUpdateSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header
        title="Maintainence"
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
  residentID: yup.string().required("required"),
  amount: yup.number().required("required"),
  dueDate: yup.date().required("required"),
});

const individualUpdateInitialValues = {
  residentID: "",
  amount: "",
  dueDate: "",
};

const monthlyUpdateSchema = yup.object().shape({
  dueDate: yup.date().required("required"),
});

const monthlyUpdateInitialValues = {
  dueDate: "",
};

export default MaintenanceForm;
