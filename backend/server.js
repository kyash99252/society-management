const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors"); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(express.json());
app.use(cors());

// Database connection configuration
const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "yash1986",
  database: "dbms_project",
};

// Route to fetch data from the database
app.get("/data", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute("SELECT * FROM resident");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Route to fetch complaints from the database
app.get("/complaints", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute("SELECT * FROM complaint");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Route to fetch fine from the database
app.get("/fines", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute("SELECT * FROM fine");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Route to fetch maintainence from the database
app.get("/maintenence", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute("SELECT * FROM maintainence");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Route to fetch data from the database
app.get("/vehicles", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute("SELECT * FROM vehicle");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Route to add a new resident
app.post("/data", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { Name, FlatNo, OccupancyStatus, ContactNumber } = req.body;
    await connection.execute("INSERT INTO resident (Name, FlatNo, OccupancyStatus, ContactNumber) VALUES (?, ?, ?, ?)", [Name, FlatNo, OccupancyStatus, ContactNumber]);
    await connection.end();
    res.json({ message: "New resident added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Route to update a resident
app.put("/data/:ResidentID", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { Name, FlatNo, OccupancyStatus, ContactNumber } = req.body;
    await connection.execute("UPDATE resident SET Name = ?, FlatNo = ?, OccupancyStatus = ?, ContactNumber = ? WHERE ResidentID = ?", [Name, FlatNo, OccupancyStatus, ContactNumber, req.params.ResidentID]);
    await connection.end();
    res.json({ message: "Resident updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});

// Route to add a new complaint
app.post("/complaints", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Description, DateReported, Status } = req.body;
    await connection.execute("INSERT INTO complaint (ResidentID, Description, DateReported, Status) VALUES (?, ?, ?, ?)", [ResidentID, Description, DateReported, Status]);
    await connection.end();
    res.json({ message: "New complaint added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Route to update a complaint
app.put("/complaints/:ComplaintID", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Description, DateReported, Status } = req.body;
    await connection.execute("UPDATE complaint SET ResidentID = ?, Description = ?, DateReported = ?, Status = ? WHERE ComplaintID = ?", [ResidentID, Description, DateReported, Status, req.params.ComplaintID]);
    await connection.end();
    res.json({ message: "Complaint updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});

// Route to add a new fine
app.post("/fines", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Reason, Date, Status, Amount } = req.body;
    await connection.execute("INSERT INTO fine (ResidentID, Reason, Date, Status, Amount) VALUES (?, ?, ?, ?, ?)", [ResidentID, Reason, Date, Status, Amount]);
    await connection.end();
    res.json({ message: "New fine added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Route to update a fine
app.put("/fines/:FineID", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Reason, Date, Status, Amount } = req.body;
    await connection.execute("UPDATE fine SET ResidentID = ?, Reason = ?, Date = ?, Status = ?, Amount = ? WHERE FineID = ?", [ResidentID, Reason, Date, Status, Amount, req.params.FineID]);
    await connection.end();
    res.json({ message: "Fine updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});

// Route to add a new maintenance record
app.post("/maintenence", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Amount, DueDate, Status } = req.body;
    await connection.execute("INSERT INTO maintainence (ResidentID, Amount, DueDate, Status) VALUES (?, ?, ?, ?)", [ResidentID, Amount, DueDate, Status]);
    await connection.end();
    res.json({ message: "New maintenance record added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Route to update a maintenance record
app.put("/maintenence/:MaintainenceID", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Amount, DueDate, Status } = req.body;
    await connection.execute("UPDATE maintainence SET ResidentID = ?, Amount = ?, DueDate = ?, Status = ? WHERE MaintainenceID = ?", [ResidentID, Amount, DueDate, Status, req.params.MaintainenceID]);
    await connection.end();
    res.json({ message: "Maintenance record updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});

// Route to add a new vehicle
app.post("/vehicles", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { RegNo, ResidentID, Type } = req.body;
    await connection.execute("INSERT INTO vehicle (RegNo, ResidentID, Type) VALUES (?, ?, ?)", [RegNo, ResidentID, Type]);
    await connection.end();
    res.json({ message: "New vehicle added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

// Route to update a vehicle
app.put("/vehicles/:RegNo", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { ResidentID, Type } = req.body;
    await connection.execute("UPDATE vehicle SET ResidentID = ?, Type = ? WHERE RegNo = ?", [ResidentID, Type, req.params.RegNo]);
    await connection.end();
    res.json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error updating data" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
