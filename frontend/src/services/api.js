const API_URL = "http://localhost:5000/api/light"; // Backend server URL

export const turnLightOn = async (userId) => {
  const response = await fetch(`${API_URL}/turnLightOn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
};

export const turnLightOff = async (userId) => {
  const response = await fetch(`${API_URL}/turnLightOff`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
};

export const setColor = async (userId, color) => {
  const response = await fetch(`${API_URL}/setColor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, color }),
  });
  return response.json();
};

export const setBrightness = async (userId, brightness) => {
  const response = await fetch(`${API_URL}/setBrightness`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, brightness }),
  });
  return response.json();
};

export const setMode = async (userId, mode) => {
  const response = await fetch(`${API_URL}/setMode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, mode }),
  });
  return response.json();
};