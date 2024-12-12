import React, { useState, useRef, useCallback } from "react";
import "../styles/Dashboard.css";
import turnOffImage from "../../../assets/turnOff.png";
import turnOffLightImage from "../../../assets/turnOffLight.png";
import ColorPicker from "../components/colorpicker"; // Adjust the path as necessary

const Dashboard = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [lightOn, setLightOn] = useState(false);
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });

  const toggleLight = () => setLightOn((prev) => !prev);

  // Handles color changes from the ColorPicker component
  const handleColorChange = useCallback(
    (hex) => {
      const rgb = hexToRgb(hex);
      setColor(rgb);
    },
    [setColor]
  );


  const rgbString = `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
  const fullColorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  // Converts Hex color code to RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

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
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
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
            <h2 className="text-xl font-semibold mb-4 label text-black">Light Controls</h2>

              {/* Circular Light Toggle Button */}
              <div className="flex items-center justify-center mt-6">
                <button
                  onClick={toggleLight}
                  className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md transition-colors ${
                    lightOn ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{
                    backgroundImage: lightOn
                      ? `url(${turnOffLightImage})`
                      : `url(${turnOffImage})`,
                    backgroundSize: lightOn ? "100%" : "70%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></button>
              </div>

              {/* Color Picker Component */}
              <div className="">
                <ColorPicker onColorChange={handleColorChange} />
              </div>

              <div className="mt-4">
                <h3 className="text-gray-700 label">Selected Color: {rgbString}</h3>
              </div>

              {/* Rectangle displaying selected color */}
              <div
                className="mt-6 rectangle-display"
                style={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: rgbString,  // Ensures the selected color is applied
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  margin: "0 auto",
                  borderRadius: "8px",
                }}
              ></div>
            </div>

            {/* Placeholder for Other Containers */}
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Container 2</h2>
              <p className="text-gray-700">Content for the second container goes here.</p>
            </div>
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Container 3</h2>
              <p className="text-gray-700">Content for the third container goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
