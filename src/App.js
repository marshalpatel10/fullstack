import React, { useEffect, useState } from "react";
import axios from "axios";
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";

const FloorPlan = () => {
  const [canvas, setCanvas] = useState(null);
  const [floorPlanData, setFloorPlanData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/floorplan")
      .then((response) => {
        setFloorPlanData(response.data);
        initializeCanvas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching floor plan data:", error);
      });
  }, []);

  const initializeCanvas = (data) => {
    const newCanvas = new fabric.Canvas("floorplanCanvas", {
      width: 1200,
      height: 800,
      backgroundColor: "#f0f0f0",
    });

    data.rooms.forEach((room) => {
      const rect = new fabric.Rect({
        left: room.x,
        top: room.y,
        width: room.width,
        height: room.height,
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
      });

      const text = new fabric.Text(room.name, {
        left: room.x + 20,
        top: room.y + 20,
        fontSize: 16,
        fill: "black",
      });

      newCanvas.add(rect, text);
    });

    data.doors.forEach((door) => {
      const rect = new fabric.Rect({
        left: door.x,
        top: door.y,
        width: 40,
        height: 10,
        fill: "brown",
      });
      newCanvas.add(rect);
    });

    data.windows.forEach((window) => {
      const rect = new fabric.Rect({
        left: window.x,
        top: window.y,
        width: 50,
        height: 10,
        fill: "blue",
      });
      newCanvas.add(rect);
    });

    setCanvas(newCanvas);
  };

  const exportAsPDF = async () => {
    const { jsPDF } = await import("jspdf");
    html2canvas(document.getElementById("floorplanContainer"), { scale: 2 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        const imgWidth = 290;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let yPosition = 10;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("floorplan.pdf");
      }
    );
  };
  

  return (
    <div id="floorplanContainer">
      <h2>Floor Plan</h2>
      <canvas id="floorplanCanvas"></canvas>
      <button onClick={exportAsPDF} style={{ marginTop: "10px", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
        Export as PDF
      </button>
    </div>
  );
};

export default FloorPlan;
