const express = require('express');
const router = express.Router();

const ctrlTravlr = require('../controllers/travlr');
const ctrlReservations = require('../controllers/reservations');

router.get('/', ctrlTravlr.travel);

router.get(
    '/reservation/:code',
    ctrlReservations.reservationForm
);

router.post(
    '/reservation/:code',
    ctrlReservations.createReservation
);

module.exports = router;