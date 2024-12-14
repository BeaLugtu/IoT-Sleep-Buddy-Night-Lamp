import React, { useEffect, useRef } from "react";
import iro from "@jaames/iro";
import "../styles/colorPicker.css";

const ColorPicker = ({ onColorChange, isDisabled }) => {
  const colorPickerRef = useRef(null); // DOM reference for the color picker
  const colorPickerInstanceRef = useRef(null); // Store the iro.js instance

  useEffect(() => {
    // Initialize the iro.js color picker only once
    if (!colorPickerInstanceRef.current) {
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
    }
  }, [onColorChange]);

  return (
    <div
      className="wrap"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: isDisabled ? "none" : "auto", // Disable interactions if isDisabled is true
        opacity: isDisabled ? 0.5 : 1, // Dim the color picker if disabled
      }}
    >
      {/* Color Picker */}
      <div className="colorPicker" ref={colorPickerRef}></div>
    </div>
  );
};

export default ColorPicker;