// dependencies
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Band } = db;

// FIND ALL BANDS
router.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundBands);
    } catch (error) {
        res.status(500).json(error);
    }
});


// FIND A BAND
router.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        });
        res.status(200).json(foundBand);
    } catch (error) {
        res.status(500).json(error);
    }
})

// CREATE A BAND
router.post('/', async (req, res) => {
    try {
        console.log('here');
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE

router.delete('/:id', async (req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedBand} band.`
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

// EXPORT
module.exports = router;
