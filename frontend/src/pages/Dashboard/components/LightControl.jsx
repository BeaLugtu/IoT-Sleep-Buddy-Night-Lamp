import React, { useState, useEffect } from 'react';
import { turnLightOn, turnLightOff, setColor, setBrightness, setMode } from '../services/api';
import { CirclePicker, ChromePicker } from 'react-color'; // Import color picker components

const LightControl = () => {
  const [color, setColorState] = useState('#ffffff');
  const [mode, setModeState] = useState('manual'); // 'manual' or 'automatic'
  const [intervalTime, setIntervalTime] = useState(5000); // Default interval time for automatic mode
  const [lightStatus, setLightStatus] = useState('off'); // 'on' or 'off'
  const [brightness, setBrightnessState] = useState(100); // Brightness level
  const [onTime, setOnTime] = useState('18:00'); // Default on time
  const [offTime, setOffTime] = useState('06:00'); // Default off time

  useEffect(() => {
    let interval;
    if (mode === 'automatic') {
      interval = setInterval(fetchLightStatus, intervalTime); // Fetch status every intervalTime milliseconds
    }
    return () => clearInterval(interval);
  }, [mode, intervalTime]);

  const fetchLightStatus = async () => {
    const response = await fetch('http://localhost:5000/api/light/status');
    const data = await response.json();
    if (data.status === 'on') {
      setColorState('#ffffff');
      setLightStatus('on');
    } else if (data.status === 'off') {
      setColorState('#000000');
      setLightStatus('off');
    } else if (data.status === 'color') {
      setColorState(data.color);
      setLightStatus('on');
    }
    if (data.brightness) {
      setBrightnessState(data.brightness);
    }
    if (data.on_time) {
      setOnTime(data.on_time);
    }
    if (data.off_time) {
      setOffTime(data.off_time);
    }
  };

  const handleTurnOn = async () => {
    await turnLightOn(1); // Assuming user_id is 1
    setLightStatus('on');
  };

  const handleTurnOff = async () => {
    await turnLightOff(1); // Assuming user_id is 1
    setLightStatus('off');
  };

  const handleColorChange = async (color) => {
    setColorState(color.hex);
    await setColor(1, color.hex); // Assuming user_id is 1
  };

  const handleModeChange = async (newMode) => {
    setModeState(newMode);
    await setMode(1, newMode); // Assuming user_id is 1
  };

  const handleIntervalChange = (event) => {
    setIntervalTime(Number(event.target.value));
  };

  const handleBrightnessChange = async (event) => {
    const newBrightness = Number(event.target.value);
    setBrightnessState(newBrightness);
    await setBrightness(1, newBrightness); // Assuming user_id is 1
  };

  const handleScheduleChange = async () => {
    await fetch('http://localhost:5000/api/light/setSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: 1, onTime, offTime }), // Assuming user_id is 1
    });
  };

  return (
    <div className="container">
      <h1>Light Control</h1>
      <div className="mode-buttons">
        <button className="button" onClick={() => handleModeChange('manual')}>Manual</button>
        <button className="button" onClick={() => handleModeChange('automatic')}>Automatic</button>
      </div>
      {mode === 'manual' && (
        <div className="manual-controls">
          <button className="button" onClick={handleTurnOn}>Turn On</button>
          <button className="button" onClick={handleTurnOff}>Turn Off</button>
          <ChromePicker
            color={color}
            onChangeComplete={handleColorChange}
            className="color-picker"
          />
          <CirclePicker
            color={color}
            onChangeComplete={handleColorChange}
            className="color-palette"
          />
          <div className="brightness-control">
            <label>
              Brightness:
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={handleBrightnessChange}
              />
            </label>
          </div>
        </div>
      )}
      {mode === 'automatic' && (
        <div className="automatic-controls">
          <div>
            <label>
              On Time:
              <input
                type="time"
                value={onTime}
                onChange={(e) => setOnTime(e.target.value)}
              />
            </label>
            <label>
              Off Time:
              <input
                type="time"
                value={offTime}
                onChange={(e) => setOffTime(e.target.value)}
              />
            </label>
            <button className="button" onClick={handleScheduleChange}>Set Schedule</button>
          </div>
          <div>
            <button className="button" onClick={handleTurnOn}>Turn On</button>
            <button className="button" onClick={handleTurnOff}>Turn Off</button>
          </div>
        </div>
      )}
      <div className="status">
        <p>Current Mode: {mode}</p>
        <p>Light Status: {lightStatus}</p>
      </div>
    </div>
  );
};

export default LightControl;