const express = require('express');
const router = express.Router();

// Model
const Stage = require('../models/Stage');

// Index Route
router.get('/', async (req, res) => {
  try {
    const stages = await Stage.find().sort({ name: 'asc' });
    res.json(stages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Show Route
router.get('/:id', getStage, (req, res) => {
  res.json(res.stage);
});

// Create Route
router.post('/', async (req, res) => {
  const stage = new Stage({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity
  });

  try {
    const newStage = await stage.save();
    res.status(201).json(newStage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Route
router.patch('/:id', getStage, async (req, res) => {
  if (req.body.name != null) {
    res.stage.name = req.body.name;
  }
  if (req.body.location != null) {
    res.stage.location = req.body.location;
  }
  if (req.body.capacity != null) {
    res.stage.capacity = req.body.capacity;
  }

  try {
    const updatedStage = await res.stage.save();
    res.json(updatedStage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Route
router.delete('/:id', getStage, async (req, res) => {
  try {
    await res.stage.remove();
    res.json({ message: 'Stage has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single stage by id
async function getStage(req, res, next) {
  let stage;
  try {
    stage = await Stage.findById(req.params.id);
    if (stage == null) {
      return res.status(404).json({ message: 'Cannot find stage' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.stage = stage;
  next();
}

module.exports = router;
