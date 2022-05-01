const { default: mongoose } = require("mongoose");
const Pet = require("../models/Pets.model");


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/crud-project';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


const cats = [
  {
    name: "Charly",
    type: "cat",
    breed: "British Shorthair Cat Breed",
    country: "British",
    gender: "female",
    user: "626e33f55bd5bbac2e248fb5",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "tuna",

  },
  {
    name: "stray",
    type: "cat",
    breed: "American Bobtail",
    country: "USA",
    gender: "male",
    user: "626e33f55bd5bbac2e248fb6",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "cat-nip",

  },
  {
    name: "Lulu",
    type: "cat",
    breed: "cross-bread",
    country: "Asia",
    gender: "female",
    user: "626e33f55bd5bbac2e248fb7",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "shrimp"
  },
  {
    name: "Kitty",
    type: "cat",
    breed: "Abyssinian Cat",
    country: "South East Asia",
    gender: "male",
    user: "626e33f55bd5bbac2e248fb8",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "chicken"
  },
  {
    name: "Lucy",
    type: "cat",
    breed: "LaPerm",
    country: "USA",
    gender: "female",
    user: "626e33f55bd5bbac2e248fb9",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "milk"
  },
  {
    name: "Nala",
    type: "cat",
    breed: "Havana",
    country: "Siam",
    gender: "male",
    user: "626e33f55bd5bbac2e248fba",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "cat kibble"
  },
  {
    name: "Bella",
    type: "cat",
    breed: "Chartreux",
    country: "France",
    gender: "female",
    user: "626e33f55bd5bbac2e248fbb",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "fish"
  },
  {
    name: "Milo",
    type: "cat",
    breed: "Bombay",
    country: "cross breed",
    gender: "female",
    user: "626e33f55bd5bbac2e248fbc",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "salmon"
  },
  {
    name: "Simba",
    type: "cat",
    breed: "American Wirehair",
    country: "USA",
    gender: "male",
    user: "626e33f55bd5bbac2e248fbd",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "turkey"
  },
  {
    name: "Cleo",
    type: "cat",
    breed: "Birman",
    country: "Burma",
    gender: "female",
    user: "626e33f55bd5bbac2e248fbe",
    imageFile: "default-img-cat.jpg",
    favouriteFood: "whipcream"
  }
]


Pet.create(cats)
  .then(catFromDB => {
    console.log(`Created ${catFromDB.length} cats`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));