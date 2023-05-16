const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Event } = db;

// INDEX
router.get('/:name', async (req, res) => {
  try {
    const foundEvents = await Event.findOne({
      where: {
        name: { name: req.params.name }
      }
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SHOW
router.get('/:name', async (req, res) => {
  try {
    const foundEvent = await Event.findOne(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: 'Successfully created a new event.',
      data: newEvent
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount, updatedEvents] = await Event.update(req.body, {
      where: { event_id: req.params.id },
      returning: true
    });
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      res.status(200).json({
        message: `Successfully updated ${updatedCount} event(s).`,
        data: updatedEvents[0]
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Event.destroy({
      where: { event_id: req.params.id }
    });
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      res.status(200).json({
        message: `Successfully deleted ${deletedCount} event(s).`
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
