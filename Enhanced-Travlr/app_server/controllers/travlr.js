const trips = [
    {
        code: 'GALEREEF',
        name: 'Gale Reef',
        description: 'Explore the colorful coral reefs and clear tropical waters of Gale Reef.',
        image: 'reef1.jpg',
        price: 899
    },
    {
        code: 'DAWSONREEF',
        name: "Dawson's Reef",
        description: 'Experience an unforgettable diving adventure at Dawson’s Reef.',
        image: 'reef2.jpg',
        price: 1099
    },
    {
        code: 'CLAIRESREEF',
        name: "Claire's Reef",
        description: 'Relax and explore the beautiful marine environment surrounding Claire’s Reef.',
        image: 'reef3.jpg',
        price: 999
    }
];

// Create a Map that uses each trip code as the key.
// This allows a specific trip to be retrieved without
// searching through the entire trips array.
const tripMap = new Map();

trips.forEach((trip) => {
    tripMap.set(trip.code, trip);
});

const travel = (req, res) => {
    // Read optional search and maximum price values
    // from the URL query string.
    const search = req.query.search
        ? req.query.search.trim().toLowerCase()
        : '';

    const maxPrice = req.query.maxPrice
        ? Number(req.query.maxPrice)
        : null;

    // Start with the complete collection of trips.
    let filteredTrips = trips;

    // Filter trips by name or description.
    if (search) {
        filteredTrips = filteredTrips.filter((trip) => {
            return (
                trip.name.toLowerCase().includes(search) ||
                trip.description.toLowerCase().includes(search)
            );
        });
    }

    // Filter trips by maximum price.
    if (maxPrice !== null && !Number.isNaN(maxPrice)) {
        filteredTrips = filteredTrips.filter((trip) => {
            return trip.price <= maxPrice;
        });
    }
// Sort the filtered results based on the user's selection.
const sort = req.query.sort || '';

if (sort === 'priceLow') {
    filteredTrips.sort((a, b) => a.price - b.price);
} else if (sort === 'priceHigh') {
    filteredTrips.sort((a, b) => b.price - a.price);
} else if (sort === 'name') {
    filteredTrips.sort((a, b) =>
        a.name.localeCompare(b.name)
    );
}
   res.render('travel', {
    title: 'Travlr Getaways',
    trips: filteredTrips,
    search: req.query.search || '',
    maxPrice: req.query.maxPrice || '',
    sort,
    sortPriceLow: sort === 'priceLow',
    sortPriceHigh: sort === 'priceHigh',
    sortName: sort === 'name'
});
};

// Retrieve a trip directly by its unique trip code.
// Map lookup has an average time complexity of O(1).
const getTripByCode = (code) => {
    return tripMap.get(code);
};

module.exports = {
    travel,
    getTripByCode
};