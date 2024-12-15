import React, { useState, useEffect } from "react";
import turnOffImage from "../../../assets/turnOff.png";
import turnOffLightImage from "../../../assets/turnOffLight.png";

const Automatic = ({ lampColor, setLampColor, lightOnContainer3, setLightOnContainer3 }) => {
  const [selectedMode, setSelectedMode] = useState("Morning Mode");

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
  }, [selectedMode, lightOnContainer3, setLampColor]);

  return (
    <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-2 text-center w-full">Automatic</h2>
        <button
          onClick={() => setLightOnContainer3((prev) => !prev)}
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
          className="lamp-shade"
          style={{
            backgroundColor: lightOnContainer3 ? lampColor : "#555", // Default shade color is #555
          }}
        ></div>
        {lightOnContainer3 && (
          <div
            className="lamp-light"
            style={{
              backgroundColor: lampColor, // Update lamp light color based on the current mode
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Automatic;
