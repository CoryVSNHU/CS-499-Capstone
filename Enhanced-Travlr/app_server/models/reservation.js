const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    confirmationNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    tripCode: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        index: true
    },

    customerName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    travelers: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },

    travelDate: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Confirmed'
    }
}, {
    timestamps: true
});

// Optimize queries for reservations by trip and date.
reservationSchema.index({
    tripCode: 1,
    travelDate: 1
});

// Optimize reservation history queries by creation date.
reservationSchema.index({
    createdAt: -1,
    _id: -1
});

// Optimize reporting queries that filter by status and trip.
reservationSchema.index({
    status: 1,
    tripCode: 1
});

module.exports = mongoose.model(
    'Reservation',
    reservationSchema
);