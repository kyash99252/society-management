import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"; // Import axios for API calls
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // Import jsPDF for PDF generation
import { useUser } from "../../useUser";

const MaintenanceForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userContext = useUser();

  // Function to download receipt as a PDF
  const downloadReceipt = async (receipt) => {
    // Generate HTML for receipt with black font color
    const receiptHtml = `
    <style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f8f8f8;
        font-family: Arial, sans-serif;
    }
    .receipt {
        color: black;
        max-width: 1000px;
        padding: 50px;
        width: 500px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .receipt h1 {
        text-align: center;
        color: #333;
    }
    .receipt p {
        font-size: 16px;
        color: #666;
    }
    .receipt p strong {
        color: #333;
    }
</style>

<div class="receipt">
    <h1>Receipt</h1>
    <p><strong>Name:</strong> ${receipt.Name}</p>
    <p><strong>Flat No:</strong> ${receipt.FlatNo}</p>
    <p><strong>Amount:</strong> ${receipt.Amount}</p>
    <p><strong>Date:</strong> ${receipt.Date}</p>
    <p><strong>Time:</strong> ${receipt.Time}</p>
    <p><strong>Maintenance ID:</strong> ${receipt.MaintenanceID}</p>
</div>
  `;

    // Create a div element with receipt HTML content
    const receiptDiv = document.createElement("div");
    receiptDiv.innerHTML = receiptHtml;

    // Append the div to the document body
    document.body.appendChild(receiptDiv);

    // Use html2canvas to convert the receiptDiv to canvas
    html2canvas(receiptDiv).then((canvas) => {
      // Convert canvas to image data URL
      const imgData = canvas.toDataURL("image/png");

      // Initialize jsPDF
      const pdf = new jsPDF();

      // Add image data URL to PDF document
      pdf.addImage(imgData, "PNG", 25, 15);

      // Save PDF file
      pdf.save("receipt.pdf");

      // Remove the div from the document body
      document.body.removeChild(receiptDiv);
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      // Make API call to update individual maintenance record
      await axios.put(
        `http://localhost:3000/maintenence/${values.maintenanceID}`,
        values
      );
      console.log("Maintenance record updated successfully");

      // If status is "Paid", generate and download receipt
      if (values.status === "Paid") {
        // Fetch additional details for receipt
        const residentDetails = await axios.get(
          `http://localhost:3000/data/${userContext.userData.residentID}`
        );
        const maintenanceDetails = await axios.get(
          `http://localhost:3000/maintenance/${userContext.userData.residentID}`
        );

        console.log(residentDetails.data[0]);
        // Prepare receipt data
        const receipt = {
          Name: residentDetails.data[0].Name,
          FlatNo: userContext.userData.residentID,
          Amount: maintenanceDetails.data[0].Amount,
          Date: new Date().toLocaleDateString(),
          Time: new Date().toLocaleTimeString(),
          MaintenanceID: values.maintenanceID,
        };

        // Download receipt as PDF
        downloadReceipt(receipt);
      }
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

// Define validation schemas and initial values
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