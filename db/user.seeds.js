
const mongoose = require('mongoose');
const User = require("../models/User.model");

// establish connection with DB
mongoose
    .connect('mongodb://localhost/crud-project')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

const users = [
    {
        name: "Alex",
        telephone: "082733549024",
        avatar: "avatar-user.png",
        email: "user1@mail.com",
        passwordHash: "user1"
    },
    {
        name: "Oscar",
        telephone: "012675678457",
        avatar: "avatar-user.png",
        email: "user2@mail.com",
        passwordHash: "user2"
    },
    {
        name: "Maria",
        telephone: "032733549024",
        avatar: "avatar-user.png",
        email: "user3@mail.com",
        passwordHash: "user3"
    },
    {
        name: "Carlos",
        telephone: "890457347435",
        avatar: "avatar-user.png",
        email: "user4@mail.com",
        passwordHash: "user4"
    },
    {
        name: "Frank",
        telephone: "458346750273",
        avatar: "avatar-user.png",
        email: "user5@mail.com",
        passwordHash: "user5"
    },
    {
        name: "Luis",
        telephone: "67873735654",
        avatar: "avatar-user.png",
        email: "user6@mail.com",
        passwordHash: "user6"
    },
    {
        name: "Manuel",
        telephone: "83765946724",
        avatar: "avatar-user.png",
        email: "user7@mail.com",
        passwordHash: "user7"
    },
    {
        name: "Stella",
        telephone: "003745730978",
        avatar: "avatar-user.png",
        email: "user8@mail.com",
        passwordHash: "user8"
    },
    {
        name: "Elena",
        telephone: "05683628463",
        avatar: "avatar-user.png",
        email: "user9@mail.com",
        passwordHash: "user9"
    },
    {
        name: "Fabian",
        telephone: "04482637404",
        avatar: "avatar-user.png",
        email: "user10@mail.com",
        passwordHash: "user10"
    }
];

User.insertMany(users)
.then(response => {
    console.log("products inserted in db successfuly", response);
})
.catch(error => {
    console.log("error inserting products in db", error);
})
.finally( () => {
    mongoose.connection.close();
});