const db = require('../config/db');

const upsertLightStatus = (user_id, fields, res) => {
  const selectQuery = 'SELECT * FROM light_status WHERE user_id = ?';
  db.query(selectQuery, [user_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const updateQuery = 'UPDATE light_status SET ? WHERE user_id = ?';
      db.query(updateQuery, [fields, user_id], (err) => {
        if (err) throw err;
        res.send({ message: 'Light status updated' });
      });
    } else {
      const insertQuery = 'INSERT INTO light_status SET ?';
      db.query(insertQuery, { user_id, ...fields }, (err) => {
        if (err) throw err;
        res.send({ message: 'Light status inserted' });
      });
    }
  });
};

const turnLightOn = (req, res) => {
  const { user_id } = req.body;
  upsertLightStatus(user_id, { status: 'on' }, res);
};

const turnLightOff = (req, res) => {
  const { user_id } = req.body;
  upsertLightStatus(user_id, { status: 'off' }, res);
};

const setColor = (req, res) => {
  const { user_id, color } = req.body;
  upsertLightStatus(user_id, { status: 'color', color }, res);
};

const setBrightness = (req, res) => {
  const { user_id, brightness } = req.body;
  upsertLightStatus(user_id, { brightness }, res);
};

const setSchedule = (req, res) => {
  const { user_id, onTime, offTime } = req.body;
  upsertLightStatus(user_id, { on_time: onTime, off_time: offTime }, res);
};

const getStatus = (req, res) => {
  const query = 'SELECT * FROM light_status WHERE user_id = 1 ORDER BY id DESC LIMIT 1';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

const setMode = (req, res) => {
  const { user_id, mode } = req.body;
  upsertLightStatus(user_id, { mode }, res);
};

module.exports = {
  turnLightOn,
  turnLightOff,
  setColor,
  setBrightness,
  setSchedule,
  getStatus,
  setMode
};
