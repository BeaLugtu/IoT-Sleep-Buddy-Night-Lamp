
import React, { useEffect, useRef } from "react";
import iro from "@jaames/iro"; // Correct import statement
import "../styles/colorPicker.css"; // Import the CSS file

const ColorPicker = ({ onColorChange }) => {
  const colorPickerRef = useRef(null); // Reference for the color picker container
  const colorPickerInstanceRef = useRef(null); // Store the iro.js instance

  useEffect(() => {
    // Initialize the iro.js color picker only once
    colorPickerInstanceRef.current = new iro.ColorPicker(colorPickerRef.current, {
      width: 280,
      color: "rgb(255, 0, 0)",
      borderWidth: 1,
      borderColor: "#fff",
    });

    // Event listener for color change
    colorPickerInstanceRef.current.on(["color:init", "color:change"], (color) => {
      if (onColorChange) {
        onColorChange(color.hexString);
      }
    });

    // Cleanup
    return () => {
      colorPickerInstanceRef.current.off(["color:init", "color:change"]);
    };
  }, [onColorChange]); // Dependency array ensures this runs only when onColorChange changes

  return (
    <div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Color Picker */}
      <div className="colorPicker" ref={colorPickerRef}></div>
    </div>
  );
};

export default ColorPicker;
