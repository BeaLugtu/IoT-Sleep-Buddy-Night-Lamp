const connection = require('../config/db'); // Database connection

// Step 1: Turn Light On (Manual Mode) - POST request
exports.turnLightOn = (req, res) => {
  const { user_id } = req.body;
  const light_on_time = new Date().toISOString();
  const color = { r: 255, g: 255, b: 255 }; // Default white color
  const mode = 'manual';

  const query = 'INSERT INTO light_activities (user_id, light_on_time, color, mode) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, light_on_time, JSON.stringify(color), mode], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    const newLightActivity = {
      id: result.insertId,
      user_id,
      light_on_time,
      color
    };

    res.json(newLightActivity);
  });
};


// Step 3: Update the color in manual mode (PUT request)
exports.updateColor = (req, res) => {
  const { id, color } = req.body;  // Color will be in RGB format {r, g, b}

  const query = 'UPDATE light_activities SET color = ? WHERE id = ?';
  connection.query(query, [JSON.stringify(color), id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ id, color });
  });
};


// Step 4: Turn off the light and calculate duration in manual mode
// Step 4: Turn Light Off and calculate duration in manual mode (PUT request)
exports.turnLightOff = (req, res) => {
  const { id } = req.body;
  const light_off_time = new Date().toISOString();

  // Get the light_on_time from the database first
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

    // Update the light_off_time and duration in seconds
    const updateQuery = 'UPDATE light_activities SET light_off_time = ?, duration = ? WHERE id = ?';
    connection.query(updateQuery, [light_off_time, durationInSeconds, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ id, light_off_time, formattedDuration });
    });
  });
};


