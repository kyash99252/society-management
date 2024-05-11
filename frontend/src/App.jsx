import { useState } from "react";
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route } from 'react-router-dom'
import MySideBar from "./scenes/global/MySideBar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Residents from "./scenes/residents";
import Maintenance from "./scenes/maintainence";
import Complaints from "./scenes/complaints";
import Fines from './scenes/fines'
import Vehicles from './scenes/vehicles'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="sidebar">
            <MySideBar isSidebar={isSidebar} />
          </div>
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/residents" element={<Residents />} />
              <Route path="/maintainence" element={<Maintenance />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/fines" element={<Fines />} />
              <Route path="/vehicles" element={<Vehicles />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
