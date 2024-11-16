const express = require('express');
const router = express.Router();
const {
    getBikes,
    getBike,
    createBike
} = require('../controllers/bikeController');

router
    .route('/')
    .get(getBikes)
    .post(createBike);

router
    .route('/:id')
    .get(getBike);

module.exports = router;