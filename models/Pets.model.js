const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const petsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        type: {
            type: String,
            enum: ["dog", "cat"],
            required: [true, "Type is required"],
        },
        breed: String,
        country: {
            type: String,
            required: [true, "Country is required"],
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        avatar: String,
        favouriteFood: String,
        description: {
            type: String,
            required: [true, "description is required"]   
        }
        
    }
);

const Pet = model('Pet', petsSchema);

module.exports = Pet;
