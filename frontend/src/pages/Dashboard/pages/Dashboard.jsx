import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import turnOffImage from "../../../assets/turnOff.png";
import turnOffLightImage from "../../../assets/turnOffLight.png";
import ColorPicker from "../components/colorpicker"; // Adjust the path as necessary
import axiosInstance from "../../../../config/axiosConfig";

const Dashboard = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [lightOnControl, setLightOnControl] = useState(false);
  const [lightOnContainer3, setLightOnContainer3] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Morning Mode");
  const [lampColor, setLampColor] = useState("rgba(255, 255, 200, 0.6)");

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
  
  const toggleLightContainer3 = async () => {
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
  
  const modes = ["Morning Mode", "Afternoon Mode", "Night Mode", "Midnight Mode"];

  const getModeColor = (mode) => {
    switch (mode) {
      case "Morning Mode":
        return "cyan";
      case "Afternoon Mode":
        return "yellow";
      case "Night Mode":
        return "rgba(255, 255, 255, 0.6)"; // Dim white
      case "Midnight Mode":
        return "rgba(255, 255, 200, 0.3)"; // Dim yellow
      default:
        return "rgba(255, 255, 200, 0.6)";
    }
  };

  const handleModeChange = (direction) => {
    const currentIndex = modes.indexOf(selectedMode);
    const nextIndex = (currentIndex + direction + modes.length) % modes.length;
    setSelectedMode(modes[nextIndex]);
  };

  useEffect(() => {
    if (lightOnContainer3) {
      setLampColor(getModeColor(selectedMode));
    }
  }, [selectedMode, lightOnContainer3]);

  // Automatically turn off Light Controls when Container 3 light is toggled on
  useEffect(() => {
    if (lightOnContainer3 && lightOnControl) {
      setLightOnControl(false);
    }
  }, [lightOnContainer3]);

  // Automatically turn off Container 3 when Light Controls is enabled
  useEffect(() => {
    if (lightOnControl && lightOnContainer3) {
      setLightOnContainer3(false);
    }
  }, [lightOnControl]);


  

  return (
    <div className="dashboard relative w-full h-screen">
      {/* Lamp Background */}
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

      {/* Main Content */}
      <div className="content relative z-10 mt-[630px] flex items-center justify-center flex-col h-full">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <h4 className="text-white text-[19px] mb-6">Let’s light up your space and get started!</h4>

          {/* Lamp Slider */}
          <div className="flex justify-center items-center mb-24">
            <form
              className="formLamp lamp-slider"
              onInput={(e) => setLightIntensity(e.target.value)}
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
                onChange={(e) => setLightIntensity(e.target.value)}
                className="w-full max-w-xs"
              />
            </form>
          </div>

          {/* Container Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-60">
            {/* First Container */}
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {/* Left side button for Light Controls */}
                  <button
                    onClick={toggleLightControl}
                    className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md transition-colors ${
                      lightOnControl ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{
                      backgroundImage: lightOnControl
                        ? `url(${turnOffLightImage})`
                        : `url(${turnOffImage})`,
                      backgroundSize: lightOnControl ? "100%" : "70%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></button>
                  <h2 className="text-xl font-semibold text-black label ml-4">Light Controls</h2>
                </div>
              </div>

              {/* Color Picker Component */}
              <div className="">
                <ColorPicker onColorChange={(color) => setLampColor(color)} isDisabled={!lightOnControl} />
              </div>

              <div className="mt-4">
                <h3 className="text-gray-700 label">Selected Color: {lampColor}</h3>
              </div>

              {/* Rectangle displaying selected color */}
              <div
                className="mt-6 rectangle-display"
                style={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: lightOnControl ? lampColor : "rgb(200, 200, 200)",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  margin: "0 auto",
                  borderRadius: "8px",
                }}
              ></div>
            </div>

            {/* Container 2 */}
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Container 2</h2>
              <p className="text-gray-700">Content for the second container goes here.</p>
            </div>

            {/* Container 3 */}
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold mb-2 text-center w-full">Automatic</h2>
                {/* Right side button for Container 3 */}
                <button
                  onClick={toggleLightContainer3}
                  className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md transition-colors ${
                    lightOnContainer3 ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{
                    backgroundImage: lightOnContainer3
                      ? `url(${turnOffLightImage})`
                      : `url(${turnOffImage})`,
                    backgroundSize: lightOnContainer3 ? "100%" : "70%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></button>
              </div>

              {lightOnContainer3 && (
                <>
                  <div className="text-gray-700 label text-center mb-4">{selectedMode}</div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleModeChange(-1)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      &larr;
                    </button>
                    <button
                      onClick={() => handleModeChange(1)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      &rarr;
                    </button>
                  </div>
                </>
              )}

              <div className="css-lamp">
                <div className="lamp-base"></div>
                <div className="lamp-pole"></div>
                <div
                  className={`lamp-shade ${lightOnContainer3 ? "light-on" : "light-off"}`}
                  style={{ backgroundColor: lightOnContainer3 ? lampColor : "#ddd" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;