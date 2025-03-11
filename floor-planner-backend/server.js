const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample floor plan data
const floorPlan = {
  rooms: [
    { id: 1, name: "Living Room", width: 500, height: 400, x: 50, y: 50 },
    { id: 2, name: "Bedroom", width: 400, height: 300, x: 600, y: 50 },
  ],
  walls: [
    { startX: 50, startY: 50, endX: 550, endY: 50 },
    { startX: 600, startY: 50, endX: 1000, endY: 50 },
  ],
  doors: [{ id: 1, roomId: 1, position: "center", x: 275, y: 50 }],
  windows: [{ id: 1, roomId: 1, position: "right", x: 500, y: 200 }],
};

app.get("/api/floorplan", (req, res) => {
  res.json(floorPlan);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
