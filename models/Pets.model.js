const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");


const petsSchema = new Schema (
    {
        type: {
        enum: ["dog", "cat"],
        },
        breed: String,
        country: String,
        gender: String,
        user: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        imageFile: "String",
        favouriteFood: "String"
    }
);



const Pet = model('Pet', petsSchema)



module.exports = Pet;
