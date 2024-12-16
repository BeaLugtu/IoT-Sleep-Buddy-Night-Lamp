import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import turnOffImage from "../../../assets/turnOff.png";
import turnOffLightImage from "../../../assets/turnOffLight.png";
import ColorPicker from "../components/colorpicker"; // Adjust the path as necessary
import axiosInstance from "../../../../config/axiosConfig";
import Automatic from "../components/automaticLight";
import Usage from "../components/usage"; // Adjust the path as necessary

const Dashboard = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [lightOnControl, setLightOnControl] = useState(false);
  const [lightOnContainer3, setLightOnContainer3] = useState(false);
  const [lampColor, setLampColor] = useState("rgba(255, 255, 200, 0.6)");
  const [activeButton, setActiveButton] = useState("History");
  const [usageData, setUsageData] = useState([
    {
      id: 1,
      mode: "Auto",
      lightsOn: "10:00 AM",
      lightsOff: "2:00 PM",
      duration: "4 hrs",
      color: "Blue",
    },
    {
      id: 2,
      mode: "Manual",
      lightsOn: "5:00 PM",
      lightsOff: "8:00 PM",
      duration: "3 hrs",
      color: "Yellow",
    },
  ]);
  const [archiveData, setArchiveData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleLightControl = async () => {
    const userId = localStorage.getItem('user_id'); // Get user_id dynamically
    const lightActivityId = localStorage.getItem('light_activity_id'); // Store 'id' for ongoing activity
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    try {
      if (lightOnControl) {
        // TURN LIGHT OFF
        const response = await axiosInstance.put("/api/auth/turnLightOff", { id: lightActivityId });
  
        const result = response.data;
        console.log("Light turned OFF:", result);
  
        // Clear the stored light_activity_id
        localStorage.removeItem("light_activity_id");
  
        // Update UI
        setLightOnControl(false);
      } else {
        // TURN LIGHT ON
        const response = await axiosInstance.post("/api/auth/turnLightOn", { user_id: userId });
  
        const result = response.data;
        console.log("Light turned ON:", result);
  
        // Store the activity ID in localStorage for future updates
        localStorage.setItem("light_activity_id", result.id);
  
        // Update UI
        setLightOnControl(true);
      }
    } catch (error) {
      console.error("Error toggling light:", error.response ? error.response.data : error.message);
    }
  };
  
  const toggleLightOnContainer3 = async () => {
    const userId = localStorage.getItem('user_id'); // Get user ID dynamically
    const lightActivityId = localStorage.getItem('light_activity_id'); // Store ongoing activity ID
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    try {
      if (lightOnContainer3) {
        // TURN LIGHT OFF in AUTOMATIC MODE
        const response = await axiosInstance.put("/api/auth/autoTurnLightOff", { id: lightActivityId });
  
        const result = response.data;
        console.log("Automatic light turned OFF:", result);
  
        // Clear the stored light_activity_id from localStorage
        localStorage.removeItem("light_activity_id");
  
        // Update UI state
        setLightOnContainer3(false);
      } else {
        // TURN LIGHT ON in AUTOMATIC MODE
        const response = await axiosInstance.post("/api/auth/autoTurnLightOn", { user_id: userId });
  
        const result = response.data;
        console.log("Automatic light turned ON:", result);
  
        // Store the activity ID in localStorage for future updates
        localStorage.setItem("light_activity_id", result.id);
  
        // Update UI state
        setLightOnContainer3(true);
      }
    } catch (error) {
      console.error("Error toggling automatic light:", error.response ? error.response.data : error.message);
    }
  };
  


  useEffect(() => {
    if (lightOnContainer3 && lightOnControl) setLightOnControl(false);
  }, [lightOnContainer3]);

  useEffect(() => {
    if (lightOnControl && lightOnContainer3) setLightOnContainer3(false);
  }, [lightOnControl]);

  const handleDelete = (id) => {
    const rowToDelete = usageData.find((row) => row.id === id);
    if (rowToDelete) {
      setSelectedRow(rowToDelete);
      setShowModal(true);
    }
  };

  const confirmDelete = () => {
    if (selectedRow) {
      setUsageData((prev) => prev.filter((row) => row.id !== selectedRow.id));
      setArchiveData((prev) => [...prev, selectedRow]);
      setSelectedRow(null);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setSelectedRow(null);
    setShowModal(false);
  };

  const handleRecover = (id) => {
    const rowToRecover = archiveData.find((row) => row.id === id);
    if (rowToRecover) {
      setSelectedRow(rowToRecover);
      setShowRecoverModal(true);
    }
  };

  const confirmRecover = () => {
    if (selectedRow) {
      setArchiveData((prev) => prev.filter((row) => row.id !== selectedRow.id));
      setUsageData((prev) => [...prev, selectedRow]);
      setSelectedRow(null);
    }
    setShowRecoverModal(false);
  };

  const cancelRecover = () => {
    setSelectedRow(null);
    setShowRecoverModal(false);
  };

  const hexToRgb = (hex) => {
    // Remove "#" if present
    hex = hex.replace(/^#/, "");
    // Parse the HEX string
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="dashboard relative w-full h-screen">
      <div className="lamp-wrapper absolute inset-0 z-0 pointer-events-none">
        <div className="lamp-rope"></div>
        <div className="lamp">
          <div className="lamp-part -top">
            <div className="lamp-part -top-part"></div>
            <div className="lamp-part -top-part right"></div>
          </div>
          <div className="lamp-part -body"></div>
          <div className="lamp-part -body right"></div>
          <div
            className="blub"
            style={{
              opacity: lightIntensity / 10,
              backgroundColor: lampColor,
            }}
          ></div>
        </div>
        <div
          className="wall-light-shadow"
          style={{ opacity: lightIntensity / 10 }}
        ></div>
      </div>

      <div className="content relative z-10 mt-[630px] flex items-center justify-center flex-col h-full">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-2">
            Welcome to Your Dashboard
          </h1>
          <h4 className="text-white text-[19px] mb-6">
            Let’s light up your space and get started!
          </h4>

          <div className="flex justify-center items-center mb-24">
            <form
              className="formLamp lamp-slider"
              onInput={(e) => setLightIntensity(Number(e.target.value))}
            >
              <div className="icon sun mx-auto mb-4">
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
                <div className="ray"></div>
              </div>
              <input
                type="range"
                id="slider"
                value={lightIntensity}
                min="0"
                max="10"
                onChange={(e) => setLightIntensity(Number(e.target.value))}
                className="w-full max-w-xs"
              />
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-60">
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button
                    onClick={toggleLightControl}
                    className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md transition-colors ${
                      lightOnControl ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{
                      backgroundImage: lightOnControl
                        ? `url(${turnOffLightImage})`
                        : `url(${turnOffImage})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></button>
                  <h2 className="text-xl font-semibold text-black label ml-4">
                    Light Controls
                  </h2>
                </div>
              </div>

              {/* Light Controls */}
          <ColorPicker
            onColorChange={(color) => {
              // If the color is in HEX, convert it to RGB
              const rgbColor = color.startsWith("#") ? hexToRgb(color) : color;
              setLampColor(rgbColor);
            }}
          />
          <div className="mt-4">
            <h3 className="text-gray-700 label">Selected Color: {lampColor}</h3>
          </div>
              <div
                className="mt-6 rectangle-display"
                style={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: lightOnControl
                    ? lampColor
                    : "rgb(200, 200, 200)",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  margin: "0 auto",
                  borderRadius: "8px",
                }}
              ></div>
            </div>

            <Usage
              usageData={usageData}
              archiveData={archiveData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              handleDelete={handleDelete}
              handleRecover={handleRecover}
            />

            <Automatic
              lampColor={lampColor}
              setLampColor={setLampColor}
              lightOnContainer3={lightOnContainer3}
              setLightOnContainer3={setLightOnContainer3}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target.className === "modal-overlay" && cancelDelete()
          }
        >
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-modal" onClick={cancelDelete}>
                X
              </button>
              <h3>Are you sure you want to delete this item?</h3>
            </div>
            <div className="modal-body">
              <button className="btn-confirm" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn-cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecoverModal && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target.className === "modal-overlay" && cancelRecover()
          }
        >
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-modal" onClick={cancelRecover}>
                X
              </button>
              <h3>Are you sure you want to recover this item?</h3>
            </div>
            <div className="modal-body">
              <button className="btn-confirm" onClick={confirmRecover}>
                Yes
              </button>
              <button className="btn-cancel" onClick={cancelRecover}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
