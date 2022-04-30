const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");


const catSchema = new Schema (
    {
        enum: ["dog", "cat"],
        breed: String,
        country: String,
        gender: String,
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "String",
        favouriteFood: "String"
    }
);



const dogSchema = new Schema (
    {
        enum: ["dog", "cat"],
        breed: String,
        country: String,
        fur: String,
        gender: String,
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "String",
        favouriteFood: "String"
    }
);

const Cat = model('Cat', catSchema)
const Dog = model('Dog', dogSchema)


module.exports = Cat;
module.exports = Dog;