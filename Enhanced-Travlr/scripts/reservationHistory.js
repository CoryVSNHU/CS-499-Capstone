const mongoose = require('mongoose');
const connectDB = require('../app_server/models/db');
const Reservation = require('../app_server/models/reservation');

// Retrieve reservations using pagination.
const getReservationHistory = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    // Count the total number of reservations.
    const totalReservations = await Reservation.countDocuments();

    // Retrieve only the records needed for this page.
    const reservations = await Reservation.find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .select(
            'confirmationNumber tripCode customerName ' +
            'travelers travelDate totalPrice status createdAt'
        )
        .lean();

    const totalPages = Math.ceil(totalReservations / limit);

    return {
        currentPage: page,
        totalPages,
        totalReservations,
        reservations
    };
};

// Run the script from the command line.
const main = async () => {
    try {
        const page = Number(process.argv[2] || 1);
        const limit = Number(process.argv[3] || 10);

        if (
            !Number.isSafeInteger(page) ||
            page < 1 ||
            !Number.isSafeInteger(limit) ||
            limit < 1 ||
            limit > 100
        ) {
            throw new Error(
                'Page must be a positive integer and limit must be between 1 and 100.'
            );
        }

        await connectDB();

        const history = await getReservationHistory(page, limit);

        console.log('\n=== Reservation History ===');
        console.log('Current Page:', history.currentPage);
        console.log('Total Pages:', history.totalPages);
        console.log('Total Reservations:', history.totalReservations);

        console.table(history.reservations.map(reservation => ({
            Confirmation: reservation.confirmationNumber,
            Trip: reservation.tripCode,
            Customer: reservation.customerName,
            Travelers: reservation.travelers,
            Total: reservation.totalPrice,
            Status: reservation.status
        })));

    } catch (error) {
        console.error('Reservation history error:', error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

main();
