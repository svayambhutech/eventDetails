const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

// Dummy events data
const eventsData = {
  '15': {
    avenue: 'Venue 1',
    nextTrip: 'Trip 1',
    dinnerVenue: 'Dinner Venue 1',
    dinnerMenu: 'Dinner Menu 1',
    lunchMenu: 'Lunch Menu 1',
  },
  '16': {
    avenue: 'Venue 2',
    nextTrip: 'Trip 2',
    dinnerVenue: 'Dinner Venue 2',
    dinnerMenu: 'Dinner Menu 2',
    lunchMenu: 'Lunch Menu 2',
  },
};

router.get('/:date', authenticateUser, (req, res) => {
  const date = req.params.date;
  const eventData = eventsData[date];

  if (!eventData) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(eventData);
});

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = router;
