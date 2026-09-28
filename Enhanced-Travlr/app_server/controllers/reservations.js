// Temporary trip data used by the reservation workflow.
// This will be moved to persistent storage in a later enhancement.

const { getTripByCode } = require('./travlr');
const trips = [
    {
        code: 'GALEREEF',
        name: 'Gale Reef',
        price: 899
    },
    {
        code: 'DAWSONREEF',
        name: "Dawson's Reef",
        price: 1099
    },
    {
        code: 'CLAIRESREEF',
        name: "Claire's Reef",
        price: 999
    }
];

const reservationForm = (req, res) => {
    const tripCode = req.params.code;

    // Retrieve the selected trip using the Map.
    // Average lookup time is O(1).
    const trip = getTripByCode(tripCode);

    if (!trip) {
        return res.status(404).send('Trip not found.');
    }

    res.render('reservation', {
        title: 'Book Your Trip',
        trip
    });
};


const createReservation = (req, res) => {
    const tripCode = req.params.code;

    // Use the Map for direct trip lookup instead of
    // performing a sequential search of the Array.
    const trip = getTripByCode(tripCode);

    if (!trip) {
        return res.status(404).send('Trip not found.');
    }

    const name = req.body.name
        ? req.body.name.trim()
        : '';

    const email = req.body.email
        ? req.body.email.trim()
        : '';

    const travelers = Number(req.body.travelers);
    const travelDate = req.body.travelDate;

    if (
    !name ||
    !email ||
    !travelDate ||
    !Number.isInteger(travelers) ||
    travelers < 1 ||
    travelers > 10
    ) {
    return res.status(400).render('reservation', {
        title: 'Book Your Trip',
        trip,
        error: 'Please complete all fields and enter between 1 and 10 travelers.',
        formData: {
            name,
            email,
            travelers,
            travelDate
        }
    });
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    return res.status(400).render('reservation', {
        title: 'Book Your Trip',
        trip,
        error: 'Please enter a valid email address.',
        formData: {
            name,
            email,
            travelers,
            travelDate
        }
    });
}

    const selectedDate = new Date(
        `${travelDate}T00:00:00`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
    Number.isNaN(selectedDate.getTime()) ||
    selectedDate < today
)    {
    return res.status(400).render('reservation', {
        title: 'Book Your Trip',
        trip,
        error: 'Travel date must be today or later.',
        formData: {
            name,
            email,
            travelers,
            travelDate
        }
    });
}

    const totalPrice = trip.price * travelers;
    const confirmationNumber =
    'TRV-' +
    Date.now().toString().slice(-8) +
    '-' +
    Math.floor(100 + Math.random() * 900);
    const reservation = {
    confirmationNumber,
    tripCode: trip.code,
    tripName: trip.name,
    name,
    email,
    travelers,
    travelDate,
    pricePerTraveler: trip.price,
    totalPrice,
    status: 'Confirmed'
};

    res.render('confirmation', {
        title: 'Reservation Confirmed',
        reservation
    });
};


module.exports = {
    reservationForm,
    createReservation
};