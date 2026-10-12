
const { randomUUID } = require('crypto');
const { getTripByCode } = require('./travlr');
const Reservation = require('../models/reservation');

// Display the reservation form.
const reservationForm = (req, res) => {
    const trip = getTripByCode(req.params.code);

    if (!trip) {
        return res.status(404).send('Trip not found.');
    }

    res.render('reservation', {
        title: 'Book Your Trip',
        trip
    });
};

// Save a reservation to MongoDB.
const createReservation = async (req, res) => {
    const trip = getTripByCode(req.params.code);

    if (!trip) {
        return res.status(404).send('Trip not found.');
    }

    const name = typeof req.body.name === 'string'
        ? req.body.name.trim()
        : '';

    const email = typeof req.body.email === 'string'
        ? req.body.email.trim()
        : '';

    const travelers = Number(req.body.travelers);

    const travelDate = typeof req.body.travelDate === 'string'
        ? req.body.travelDate
        : '';

    const formData = {
        name,
        email,
        travelers: req.body.travelers,
        travelDate
    };

    // Re-render the form without losing entered information.
    const showError = (message, status = 400) => {
        return res.status(status).render('reservation', {
            title: 'Book Your Trip',
            trip,
            error: message,
            formData
        });
    };

    // Validate required fields and traveler count.
    if (
        !name ||
        !email ||
        !travelDate ||
        !Number.isInteger(travelers) ||
        travelers < 1 ||
        travelers > 10
    ) {
        return showError(
            'Please complete all fields and enter between 1 and 10 travelers.'
        );
    }

    // Validate the email address.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return showError('Please enter a valid email address.');
    }

    // Validate the travel date.
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(travelDate)) {
        return showError('Please enter a valid travel date.');
    }

    const selectedDate = new Date(`${travelDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate < today ||
        selectedDate.getFullYear() !== Number(travelDate.slice(0, 4)) ||
        selectedDate.getMonth() + 1 !== Number(travelDate.slice(5, 7)) ||
        selectedDate.getDate() !== Number(travelDate.slice(8, 10))
    ) {
        return showError('Travel date must be today or later.');
    }

    // Calculate the total on the server, not in the browser.
    const totalPrice = trip.price * travelers;

    // Generate a confirmation number using a UUID.
    const confirmationNumber = 'TRV-' + randomUUID();

    try {
        // Persist the reservation in MongoDB.
        const savedReservation = await Reservation.create({
            confirmationNumber,
            tripCode: trip.code,
            customerName: name,
            email,
            travelers,
            travelDate: selectedDate,
            totalPrice,
            status: 'Confirmed'
        });

        // Keep the same properties expected by confirmation.hbs.
        const reservation = {
            confirmationNumber: savedReservation.confirmationNumber,
            tripCode: savedReservation.tripCode,
            tripName: trip.name,
            name: savedReservation.customerName,
            email: savedReservation.email,
            travelers: savedReservation.travelers,
            travelDate,
            pricePerTraveler: trip.price,
            totalPrice: savedReservation.totalPrice,
            status: savedReservation.status
        };

        return res.render('confirmation', {
            title: 'Reservation Confirmed',
            reservation
        });

    } catch (error) {
        console.error('Reservation database error:', error);

        return showError(
            'We could not save your reservation. Please try again.',
            503
        );
    }
};

module.exports = {
    reservationForm,
    createReservation
};
