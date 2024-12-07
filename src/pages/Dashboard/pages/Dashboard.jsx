import React, { useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [lightOn, setLightOn] = useState(false);
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });

  const toggleLight = () => setLightOn((prev) => !prev);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColor((prev) => ({
      ...prev,
      [name]: Math.min(255, Math.max(0, value)), // Clamp RGB values between 0 and 255
    }));
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
      <div className="content relative z-10 mt-[170px] flex items-center justify-center flex-col h-full">
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
              <h2 className="text-xl font-semibold mb-4">Light Controls</h2>

              {/* Light Toggle Button */}
              <button
                onClick={toggleLight}
                className={`flex items-center justify-center w-full px-4 py-2 rounded shadow-md ${
                  lightOn ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                <span className="material-icons">
                  {lightOn ? "toggle_on" : "toggle_off"}
                </span>
                <span className="ml-2">
                  {lightOn ? "Light ON" : "Light OFF"}
                </span>
              </button>

              {/* Color Picker UI */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Pick a Color</h3>
                <input
                  type="color"
                  value={`#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b)
                    .toString(16)
                    .slice(1)}`}
                  onChange={(e) => {
                    const hex = e.target.value.substring(1);
                    setColor({
                      r: parseInt(hex.slice(0, 2), 16),
                      g: parseInt(hex.slice(2, 4), 16),
                      b: parseInt(hex.slice(4, 6), 16),
                    });
                  }}
                  className="w-20 h-20 rounded-full border shadow"
                />
                <div className="flex mt-4 space-x-2">
                  <div className="flex items-center">
                    <label className="mr-2 text-gray-700">R:</label>
                    <input
                      type="number"
                      name="r"
                      value={color.r}
                      onChange={handleColorChange}
                      className="w-12 border rounded text-center"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-gray-700">G:</label>
                    <input
                      type="number"
                      name="g"
                      value={color.g}
                      onChange={handleColorChange}
                      className="w-12 border rounded text-center"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-gray-700">B:</label>
                    <input
                      type="number"
                      name="b"
                      value={color.b}
                      onChange={handleColorChange}
                      className="w-12 border rounded text-center"
                    />
                  </div>
                </div>
              </div>
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
