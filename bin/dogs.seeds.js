const mongoose = require('mongoose');
const Pets = require("../models/Pets.model");

// establish connection with DB
mongoose
    .connect('mongodb://localhost/crud-project')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

    const dogs = [
        {
            name: "Bruno",
            type: "dog",
            breed: "Akita",
            country: "Freiburg",
            gender: "male",
            user: "626d3ec8a82a1a070002189a",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Bacon",
        },
        {
            name: "Bella",
            type: "dog",
            breed: "Australian Shepherd",
            country: "London",
            gender: "female",
            user: "626d3ec8a82a1a070002189b",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Cheese",
        },
        {
            name: "Luna",
            type: "dog",
            breed: "Bulldog",
            country: "Madrid",
            gender: "female",
            user: "626d3ec8a82a1a070002189c",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Salmon",
        },
        {
            name: "Lily",
            type: "dog",
            breed: "Spanish Water Dog",
            country: "Madrid",
            gender: "female",
            user: "626d3ec8a82a1a070002189d",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Salmon",
        },
        {
            name: "Charlie",
            type: "dog",
            breed: "Doberman",
            country: "Roma",
            gender: "male",
            user: "626d3ec8a82a1a070002189e",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Baked Chicken",
        },
        {
            name: "Rocky",
            type: "dog",
            breed: "Chihuahua",
            country: "Paris",
            gender: "male",
            user: "626d3ec8a82a1a070002189f",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Baked Chicken",
        },
        {
            name: "Milo",
            type: "dog",
            breed: "Beagle",
            country: "Berlin",
            gender: "male",
            user: "626d3ec8a82a1a07000218a0",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Peanut butter",
        },
        {
            name: "Rex",
            type: "dog",
            breed: "German Shepherd",
            country: "Berlin",
            gender: "male",
            user: "626d3ec8a82a1a07000218a1",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Watermelon",
        },
        {
            name: "Ruby",
            type: "dog",
            breed: "Beagle",
            country: "Basel",
            gender: "female",
            user: "626d3ec8a82a1a07000218a2",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Yogurt",
        },
        {
            name: "Sophie",
            type: "dog",
            breed: "Beagle",
            country: "Munich",
            gender: "female",
            user: "626d3ec8a82a1a07000218a3",
            imageFile: "default-img-dog.jpg",
            favouriteFood: "Tuna",
        },
    ];

Pets.insertMany(dogs)
.then(response => {
    console.log("products inserted in db successfuly", response);
})
.catch(error => {
    console.log("error inserting products in db", error);
})
.finally( () => {
    mongoose.connection.close();
});