const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");


const petsSchema = new Schema (
    {
        type: {
            type: "String",
            enum: ["dog", "cat"],
        },
        breed: String,
        country: String,
        gender: {
            type: "String",
            enum: ["male", "female"],
        },
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "String",
        favouriteFood: "String"
    }
);



const Pet = model('Pet', petsSchema)



module.exports = Pet;
