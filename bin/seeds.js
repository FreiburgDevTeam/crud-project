const { default: mongoose } = require("mongoose");
const Dog = require("../models/Pets.model");
const Cat = require("../models/Pets.model");

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
        enum: "cat",
        breed: "British Shorthair Cat Breed",
        country: "British",
        gender: "female",
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "/public/images/default-img-cat.jpg",
        favouriteFood: "tuna"
    }
  ]

  const dogs = (
    {
        enum: "dog",
        breed: "German Shepherd",
        country: "Germany",
        fur: "Fur",
        gender: "Male",
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "/public/images/default-img-dog.jpg",
        favouriteFood: "meats"
    }
);

Cat.create(cats)
  .then(catFromDB => {
    console.log(`Created ${catFromDB.length} cats`);
    return Dog.create(dogs);
  })
  .then(dogsFromDB => {
    console.log(`Created ${dogsFromDB.length} dogs`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));