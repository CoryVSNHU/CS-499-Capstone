
const mongoose = require('mongoose');
const connectDB = require('../app_server/models/db');
const Reservation = require('../app_server/models/reservation');

// Generate a reservation summary grouped by trip.
const generateReservationReport = async () => {
    return Reservation.aggregate([
        // Include only confirmed reservations.
        {
            $match: {
                status: 'Confirmed'
            }
        },

        // Group reservations by trip code.
        {
            $group: {
                _id: '$tripCode',
                totalReservations: { $sum: 1 },
                totalTravelers: { $sum: '$travelers' },
                totalRevenue: { $sum: '$totalPrice' },
                averageReservationValue: {
                    $avg: '$totalPrice'
                }
            }
        },

        // Sort by highest revenue first.
        {
            $sort: {
                totalRevenue: -1,
                _id: 1
            }
        },

        // Format the output.
        {
            $project: {
                _id: 0,
                tripCode: '$_id',
                totalReservations: 1,
                totalTravelers: 1,
                totalRevenue: 1,
                averageReservationValue: {
                    $round: ['$averageReservationValue', 2]
                }
            }
        }
    ]);
};

const main = async () => {
    try {
        await connectDB();

        const report = await generateReservationReport();

        console.log('\n=== Travlr Reservation Report ===');

        if (report.length === 0) {
            console.log('No confirmed reservations found.');
        } else {
            console.table(report);
        }

    } catch (error) {
        console.error(
            'Reservation report error:',
            error.message
        );
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

main();
