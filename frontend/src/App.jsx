import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MySideBar from "./scenes/global/MySideBar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Residents from "./scenes/residents";
import Maintenance from "./scenes/maintainence";
import Complaints from "./scenes/complaints";
import Fines from "./scenes/fines";
import Vehicles from "./scenes/vehicles";
import Add from "./scenes/add";
import Update from "./scenes/modify";
import LoginPage from "./scenes/login";
import UserDashboard from "./scenes/user_dashboard";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <div className="app">
                {isSidebar && (
                  <div className="sidebar">
                    <MySideBar />
                  </div>
                )}
                <main className="content">
                  <Topbar />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/residents" element={<Residents />} />
                    <Route path="/maintainence" element={<Maintenance />} />
                    <Route path="/complaints" element={<Complaints />} />
                    <Route path="/fines" element={<Fines />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/user_dash" element={<UserDashboard/>}/>
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
