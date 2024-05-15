import { useNavigate } from "react-router-dom";
import { useUser } from "../../useUser";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const userContext = useUser();

  const handleFormSubmit = async (values) => {
    // Ensure that updateUserData is defined
    if (!userContext || typeof userContext.updateUserData !== "function") {
      console.error("User context is not available.");
      return;
    }

    const { updateUserData } = userContext;

    // Check if admin
    if (
      values.userType === "admin" &&
      values.username === "yash" &&
      values.password === "admin"
    ) {
      updateUserData({ userType: "admin", username: values.username });
      navigate("/dashboard");
    }
    // Check if user
    else if (
      values.userType === "user" &&
      values.password === "root" &&
      values.residentID // Make sure residentID is not empty
    ) {
      updateUserData({ userType: "user", residentID: values.residentID });
      navigate("/user_dash");
    }
    // Handle incorrect credentials
    else {
      console.log("Incorrect credentials");
    }
  };

  return (
    <Box
      m="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        bgcolor="#1F2A40"
        borderRadius="16px"
        p="50px"
        width="40%"
        height="70%"
        pl="90px"
        pr="90px"
      >
        <Header title="Login" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            username: "",
            password: "",
            residentID: "",
            userType: "",
          }}
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
              <Box display="flex" flexDirection="column" gap="20px">
                <TextField
                  select
                  variant="filled"
                  label="User Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userType}
                  name="userType"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </TextField>
                {values.userType === "admin" && (
                  <TextField
                    variant="filled"
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                  />
                )}
                {values.userType === "user" && (
                  <TextField
                    variant="filled"
                    label="Resident ID or Flat No"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.residentID}
                    name="residentID"
                  />
                )}
                <TextField
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;