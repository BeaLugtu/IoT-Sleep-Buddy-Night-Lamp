import React, { useState, useRef, useEffect } from "react";
import "../styles/Dashboard.css";
import turnOffImage from "../../../assets/turnOff.png";
import turnOffLightImage from "../../../assets/turnOffLight.png";

const Dashboard = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [lightOn, setLightOn] = useState(false);
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
  const [brightness, setBrightness] = useState(1);
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
  const circleRef = useRef(null);

  const toggleLight = () => setLightOn((prev) => !prev);

  // Utility: Get color at cursor using an offscreen canvas
  const getColorAtCursor = (x, y) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const size = 300; // Matches the size of your color picker
    canvas.width = size;
    canvas.height = size;

    // Create a conic gradient
    const gradient = ctx.createConicGradient(0, size / 2, size / 2);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1 / 6, "yellow");
    gradient.addColorStop(2 / 6, "green");
    gradient.addColorStop(3 / 6, "cyan");
    gradient.addColorStop(4 / 6, "blue");
    gradient.addColorStop(5 / 6, "magenta");
    gradient.addColorStop(1, "red");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const rect = circleRef.current.getBoundingClientRect();
    const canvasX = Math.round((x - rect.left) * (size / rect.width));
    const canvasY = Math.round((y - rect.top) * (size / rect.height));

    const { data } = ctx.getImageData(canvasX, canvasY, 1, 1);
    return { r: data[0], g: data[1], b: data[2] };
  };

  const handleMouseMove = (e) => {
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let x = e.clientX - centerX;
    let y = e.clientY - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const radius = rect.width / 2;

    // Constrain marker to the circle's radius
    if (distance > radius) {
      const angle = Math.atan2(y, x);
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
    }

    setMarkerPosition({ x, y });

    // Use getColorAtCursor to fetch color
    const selectedColor = getColorAtCursor(e.clientX, e.clientY);
    setColor(selectedColor);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const rgbString = `rgb(${Math.round(color.r * brightness)}, ${Math.round(
    color.g * brightness
  )}, ${Math.round(color.b * brightness)})`;

  const fullColorString = `rgb(${color.r}, ${color.g}, ${color.b})`;

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
              backgroundColor: rgbString,
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
          <h1 className="text-white text-4xl font-bold mb-2">
            Welcome to Your Dashboard
          </h1>
          <h4 className="text-white text-[19px] mb-6">
            Let’s light up your space and get started!
          </h4>

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

              {/* Circular Color Picker */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Pick a Color</h3>
                <div
                  ref={circleRef}
                  onMouseDown={handleMouseDown}
                  style={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background:
                      "conic-gradient(red, yellow, green, cyan, blue, magenta, red)",
                    cursor: "pointer",
                  }}
                >
                  {/* Draggable Marker */}
                  <div
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "white",
                      border: "2px solid black",
                      top: `calc(50% + ${markerPosition.y}px - 10px)`,
                      left: `calc(50% + ${markerPosition.x}px - 10px)`,
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>

                <div className="mt-4">
                  <h3 className="text-gray-700">Selected Color: {rgbString}</h3>
                </div>

                {/* Rectangle displaying selected color */}
                <div
                  className="mt-6 rectangle-display"
                  style={{
                    width: "200px",
                    height: "100px",
                    backgroundColor: rgbString,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                    borderRadius: "8px",
                  }}
                ></div>

                {/* Brightness Slider */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">
                    Adjust Brightness
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={brightness}
                    onChange={(e) =>
                      setBrightness(parseFloat(e.target.value))
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Other Container Boxes */}
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Color: {fullColorString}
              </h2>
            </div>
            <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Box 3</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
