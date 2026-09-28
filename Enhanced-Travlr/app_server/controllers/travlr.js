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

const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways',
        trips
    });
};

module.exports = {
    travel
};