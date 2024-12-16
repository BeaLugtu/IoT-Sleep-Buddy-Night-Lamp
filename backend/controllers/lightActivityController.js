const connection = require('../config/db'); // Assuming connection.js is your DB connection file
const moment = require('moment-timezone');  // Import moment-timezone

// Helper function to convert UTC time to Philippines Time (PHT)
function convertUTCToPHT(utcDate) {
  // Use moment-timezone to convert UTC to PHT (GMT+8)
  return moment.utc(utcDate).tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss'); // Returns the local time in PHT
}

// Helper function to format duration (seconds) to HH:MM:SS
function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Turn light on and insert a new record into the database
exports.turnLightOn = (req, res) => {
  const { user_id } = req.body;
  const light_on_time = new Date().toISOString(); // Get the current time in UTC

  // Default color is white (RGB)
  const color = { r: 255, g: 255, b: 255 }; // White color
  const mode = 'manual'; // Set mode as 'manual'

  // Insert the light on activity into the database
  const insertQuery = 'INSERT INTO light_activities (user_id, light_on_time, color, mode) VALUES (?, ?, ?, ?)';
  connection.query(insertQuery, [user_id, light_on_time, JSON.stringify(color), mode], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Return the response with the light_on_time in PHT and the default color
    const localLightOnTime = convertUTCToPHT(light_on_time);
    res.json({ id: result.insertId, user_id, light_on_time: localLightOnTime, color, mode });
  });
};

// Set the light color (update color)
exports.setColor = (req, res) => {
  const { id, color } = req.body; // Color to be updated
  const updateQuery = 'UPDATE light_activities SET color = ? WHERE id = ?';

  connection.query(updateQuery, [JSON.stringify(color), id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Return the updated color in the response
    res.json({ id, color });
  });
};

// Turn light off and calculate the duration
exports.turnLightOff = (req, res) => {
  const { id } = req.body;
  const light_off_time = new Date().toISOString(); // Get the current time in UTC

  // Get the light_on_time from the database
  const selectQuery = 'SELECT light_on_time FROM light_activities WHERE id = ?';
  connection.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const light_on_time = results[0].light_on_time;
    const durationInSeconds = Math.floor((new Date(light_off_time) - new Date(light_on_time)) / 1000); // Duration in seconds

    // Convert duration to HH:MM:SS format
    const formattedDuration = formatDuration(durationInSeconds);

    // Update the light_off_time and duration in seconds in the database
    const updateQuery = 'UPDATE light_activities SET light_off_time = ?, duration = ? WHERE id = ?';
    connection.query(updateQuery, [light_off_time, durationInSeconds, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      const localLightOffTime = convertUTCToPHT(light_off_time); // Convert light_off_time to PHT
      res.json({ id, light_off_time: localLightOffTime, formattedDuration });
    });
  });
};

// Turn light on in automatic mode
exports.turnLightOnAutomatic = (req, res) => {
  const { user_id } = req.body;
  const light_on_time = new Date().toISOString(); // Get current UTC time
  
  // Get the current hour in PHT (UTC+8)
  const currentHour = new Date().getUTCHours() + 8;

  let light_mode;
  let color;

  // Determine light_mode and fixed color based on the time
  if (currentHour >= 6 && currentHour < 12) {
    light_mode = 'morning';
    color = { r: 255, g: 223, b: 186 }; // Soft warm light
  } else if (currentHour >= 12 && currentHour < 18) {
    light_mode = 'afternoon';
    color = { r: 255, g: 255, b: 224 }; // Neutral daylight
  } else if (currentHour >= 18 && currentHour < 21) {
    light_mode = 'evening';
    color = { r: 255, g: 183, b: 178 }; // Soft red hue
  } else {
    light_mode = 'midnight';
    color = { r: 192, g: 192, b: 192 }; // Dim gray light
  }

  const mode = 'automatic'; // Set mode as automatic

  // Insert the light activity into the database
  const insertQuery = `
    INSERT INTO light_activities (user_id, light_on_time, mode, light_mode, color)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(insertQuery, [user_id, light_on_time, mode, light_mode, JSON.stringify(color)], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Convert light_on_time to PHT for display
    const localLightOnTime = convertUTCToPHT(light_on_time);

    res.json({
      id: result.insertId,
      user_id,
      light_on_time: localLightOnTime,
      mode,
      light_mode,
      color
    });
  });
};


// Turn light off in automatic mode
exports.turnLightOffAutomatic = (req, res) => {
  const { id } = req.body;
  const light_off_time = new Date().toISOString(); // Get current UTC time

  // Fetch the light_on_time from the database
  const selectQuery = 'SELECT light_on_time FROM light_activities WHERE id = ?';
  connection.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const light_on_time = results[0].light_on_time;
    const durationInSeconds = Math.floor((new Date(light_off_time) - new Date(light_on_time)) / 1000);

    // Convert duration to HH:MM:SS format
    const formattedDuration = formatDuration(durationInSeconds);

    // Update the light_off_time and duration in the database
    const updateQuery = 'UPDATE light_activities SET light_off_time = ?, duration = ? WHERE id = ?';
    connection.query(updateQuery, [light_off_time, durationInSeconds, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      const localLightOffTime = convertUTCToPHT(light_off_time);
      res.json({ id, light_off_time: localLightOffTime, formattedDuration });
    });
  });
};




// History: Get all light activities for a specific user
exports.getHistory = (req, res) => {
  const { user_id } = req.params; // Get the user_id from the request parameters

  // Query to get all light activities for the user
  const selectQuery = 'SELECT * FROM light_activities WHERE user_id = ? AND archived = 0'; // Only get non-archived activities
  connection.query(selectQuery, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Return the light activities in the response
    res.json({ activities: results });
  });
};

// Archived: Get all archived light activities for a specific user
exports.getArchived = (req, res) => {
  const { user_id } = req.params; // Get the user_id from the request parameters

  // Query to get all archived light activities for the user
  const selectQuery = 'SELECT * FROM light_activities WHERE user_id = ? AND archived = 1'; // Only get archived activities
  connection.query(selectQuery, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Return the archived light activities in the response
    res.json({ archivedActivities: results });
  });
};

// Archive a light activity (set archived = 1)
exports.archiveActivity = (req, res) => {
  const { id } = req.params; // Get the activity id from the request URL

  // Query to set the activity as archived
  const updateQuery = 'UPDATE light_activities SET archived = 1 WHERE id = ?';
  connection.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Return a success message
    res.json({ message: 'Activity archived' });
  });
};


// Delete a light activity permanently (from archived)
exports.deleteActivity = (req, res) => {
  const { id } = req.params; // Get the activity id from the request parameters

  // Query to check if the activity is archived
  const checkArchivedQuery = 'SELECT archived FROM light_activities WHERE id = ?';
  connection.query(checkArchivedQuery, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const { archived } = results[0];
    if (archived !== 1) {
      return res.status(400).json({ message: 'Activity is not archived. Only archived activities can be deleted.' });
    }

    // Proceed to delete the activity if it is archived
    const deleteQuery = 'DELETE FROM light_activities WHERE id = ?';
    connection.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'Activity deleted permanently' });
    });
  });
};



