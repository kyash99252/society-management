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

app.post("/add_vehicles", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query =
      "INSERT INTO vehicle (RegNo, ResidentID, Type) VALUES (?, ?, ?)";

    const { RegNo, ResidentID, Type } = req.body; // Destructure the properties

    // Validate the data here before inserting it into the database

    await connection.execute(query, [RegNo, ResidentID, Type]); // Insert data

    await connection.end();
    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Error adding vehicle" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
