const db = require('../config/db'); // Database connection

// Insert a new light activity for a user
const insertActivity = (userId, lightOnTime, lightOffTime, duration, color, mode) => {
  const query = `
    INSERT INTO light_activities (user_id, light_on_time, light_off_time, duration, color, mode, is_archived)
    VALUES (?, ?, ?, ?, ?, ?, FALSE);
  `;

  // Ensure color is in correct format as a single RGB object
  const colorString = JSON.stringify(color); // convert the RGB object to a JSON string for storage

  db.query(query, [userId, lightOnTime, lightOffTime, duration, colorString, mode], (err, result) => {
    if (err) {
      console.error('Error inserting activity:', err);
      return;
    }
    console.log('Activity inserted for user:', userId);
  });
};

// Get active light activities (not archived) for a specific user
const getActiveActivities = (userId, callback) => {
  const query = `
    SELECT * FROM light_activities WHERE user_id = ? AND is_archived = FALSE;
  `;
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching active activities:', err);
      return;
    }
    callback(result); // return the result through the callback function
  });
};

// Get archived light activities for a specific user
const getArchivedActivities = (userId, callback) => {
  const query = `
    SELECT * FROM light_activities WHERE user_id = ? AND is_archived = TRUE;
  `;
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching archived activities:', err);
      return;
    }
    callback(result); // return the result through the callback function
  });
};

// Archive an activity (mark as archived)
const archiveActivity = (userId, activityId) => {
  const query = `
    UPDATE light_activities SET is_archived = TRUE WHERE id = ? AND user_id = ?;
  `;
  
  db.query(query, [activityId, userId], (err, result) => {
    if (err) {
      console.error('Error archiving activity:', err);
      return;
    }
    console.log('Activity archived for user:', userId);
  });
};

// Delete an activity permanently
const deleteActivity = (userId, activityId) => {
  const query = `
    DELETE FROM light_activities WHERE id = ? AND user_id = ?;
  `;
  
  db.query(query, [activityId, userId], (err, result) => {
    if (err) {
      console.error('Error deleting activity:', err);
      return;
    }
    console.log('Activity deleted for user:', userId);
  });
};

module.exports = {
  insertActivity,
  getActiveActivities,
  getArchivedActivities,
  archiveActivity,
  deleteActivity
};
