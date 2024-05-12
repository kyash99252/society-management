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

const pool = mysql.createPool(dbConfig);

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
    const { residentID: ResidentID, name: Name, flatNo: FlatNo, status: OccupancyStatus, phoneNumber: ContactNumber } = req.body;
    console.log(req.body)
    const [currentResident] = await connection.execute("SELECT * FROM resident WHERE ResidentID = ?", [req.params.ResidentID]);
    const updatedName = Name !== undefined && Name !== '' ? Name : currentResident[0].Name;
    const updatedFlatNo = FlatNo !== undefined && FlatNo !== '' ? FlatNo : currentResident[0].FlatNo;
    const updatedOccupancyStatus = OccupancyStatus !== undefined && OccupancyStatus !== '' ? OccupancyStatus : currentResident[0].OccupancyStatus;
    const updatedContactNumber = ContactNumber !== undefined && ContactNumber !== '' ? ContactNumber : currentResident[0].ContactNumber;
    await connection.execute("UPDATE resident SET Name = ?, FlatNo = ?, OccupancyStatus = ?, ContactNumber = ? WHERE ResidentID = ?", [updatedName, updatedFlatNo, updatedOccupancyStatus, updatedContactNumber, req.params.ResidentID]);
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
    const {
      residentID: ResidentID,
      description: Description,
      dateReported: DateReported,
      status: Status,
    } = req.body;

    const [currentComplaint] = await connection.execute("SELECT * FROM complaint WHERE ComplaintID = ?", [req.params.ComplaintID]);
    const updatedResidentID = ResidentID !== undefined && ResidentID !== '' ? ResidentID : currentComplaint[0].ResidentID;
    const updatedDescription = Description !== undefined && Description !== '' ? Description : currentComplaint[0].Description;
    const updatedDateReported = DateReported !== undefined && DateReported !== '' ? DateReported : currentComplaint[0].DateReported;
    const updatedStatus = Status !== undefined && Status !== '' ? Status : currentComplaint[0].Status;

    await connection.execute("UPDATE complaint SET ResidentID = ?, Description = ?, DateReported = ?, Status = ? WHERE ComplaintID = ?", [updatedResidentID, updatedDescription, updatedDateReported, updatedStatus, req.params.ComplaintID]);
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
    const [currentFine] = await connection.execute("SELECT * FROM fine WHERE FineID = ?", [req.params.FineID]);
    const updatedResidentID =
      ResidentID !== undefined && ResidentID !== ""
        ? ResidentID
        : currentFine[0].ResidentID;
    const updatedReason =
      Reason !== undefined && Reason !== "" ? Reason : currentFine[0].Reason;
    const updatedDate =
      Date !== undefined && Date !== "" ? Date : currentFine[0].Date;
    const updatedStatus =
      Status !== undefined && Status !== "" ? Status : currentFine[0].Status;
    const updatedAmount =
      Amount !== undefined && Amount !== "" ? Amount : currentFine[0].Amount;
    
    await connection.execute("UPDATE fine SET ResidentID = ?, Reason = ?, Date = ?, Status = ?, Amount = ? WHERE FineID = ?", [updatedResidentID, updatedReason, updatedDate, updatedStatus, updatedAmount, req.params.FineID]);
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
    const {
      maintenanceID: MaintenenceID,
      status: Status,
      residentID: ResidentID,
      amount: Amount,
      dueDate: DueDate,
    } = req.body;


    // Fetch current maintenance record information
    const [currentMaintenance] = await connection.execute(
      "SELECT * FROM maintainence WHERE MaintainenceID = ?",
      [req.params.MaintainenceID]
    );

    if (!currentMaintenance || !currentMaintenance.length) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    // Use original values if not provided in the request body
    const updatedResidentID =
      ResidentID !== undefined && ResidentID !== ""
        ? ResidentID
        : currentMaintenance[0].ResidentID;
    const updatedAmount =
      Amount !== undefined && Amount !== ""
        ? Amount
        : currentMaintenance[0].Amount;
    const updatedDueDate =
      DueDate !== undefined && DueDate !== ""
        ? DueDate
        : currentMaintenance[0].DueDate;
    const updatedStatus =
      Status !== undefined && Status !== ""
        ? Status
        : currentMaintenance[0].Status;

    // Update maintenance record
    await connection.execute(
      "UPDATE maintainence SET ResidentID = ?, Amount = ?, DueDate = ?, Status = ? WHERE MaintainenceID = ?",
      [
        updatedResidentID,
        updatedAmount,
        updatedDueDate,
        updatedStatus,
        req.params.MaintainenceID,
      ]
    );

    await connection.end();
    res.json({ message: "Maintenance record updated successfully" });
  } catch (error) {
    console.error("Error updating maintenance record:", error);
    res.status(500).json({ error: "Error updating maintenance record" });
  }
});

app.put("/maintenance/monthly", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { dueDate } = req.body;
    console.log(dueDate);
    // Update due date for all maintenance records
    await connection.execute("UPDATE maintainence SET DueDate = ?", [dueDate]);
    await connection.end();
    res.json({ message: "Monthly maintenance records updated successfully" });
  } catch (error) {
    console.error("Error updating monthly maintenance records:", error);
    res
      .status(500)
      .json({ error: "Error updating monthly maintenance records" });
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

// Route to update vehicle data
app.put("/vehicles/:RegNo", async (req, res) => {
  try {
    const regNo = req.params.RegNo;
    if (!regNo || typeof regNo !== "string") {
      throw new Error("Invalid registration number");
    }

    // Extract data from request body
    const { ResidentID, Type } = req.body;

    // Fetch current vehicle information
    const [currentVehicle] = await pool.execute(
      "SELECT * FROM vehicle WHERE RegNo = ?",
      [regNo]
    );

    if (!currentVehicle || !currentVehicle.length) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Use original values if not provided in the request body
    const updatedResidentID =
      ResidentID !== undefined && ResidentID !== ""
        ? ResidentID
        : currentVehicle[0].ResidentID;
    const updatedType = Type !== undefined ? Type : currentVehicle[0].Type;

    console.log("Updated ResidentID:", updatedResidentID);
    console.log("Updated Type:", updatedType);

    // Update vehicle information
    await pool.execute(
      "UPDATE vehicle SET ResidentID = ?, Type = ? WHERE RegNo = ?",
      [updatedResidentID, updatedType, regNo]
    );

    res.json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Error updating vehicle" });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
