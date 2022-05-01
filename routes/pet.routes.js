const { populate } = require("../models/Pets.model");
const Pet = require("../models/Pets.model");
const User = require("../models/User.model");
const router = require("./user.routes");


// READ: display list of Pets
router.get("/", (req, res, next) => {
    Pet.find()
        .populate("user")
        .then((petsArr) => {
            res.render("pets/pets-list", { pets: petsArr });
        })
        .catch(err => {
            console.log("error getting pets from DB", err)
            next(err);
        });
});

// create a Pet
router.get("/create", (req, res, next) => {
    User.find()
        .then(userArr => {
            res.render("pets/pet-create", {users: userArr});
        })
        .catch(err => {
            console.log("error getting user from DB", err)
            next(err);
        });    
})

// process create form
router.post("/create", (req, res, next) => {

    const newPet = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        country: req.body.country,
        gender: req.body.gender,
        user: req.body.user,
        favouriteFood: req.body.favouriteFood,
    }

    Pet.create(newPet)
        .then(() => {
            res.redirect("/pets");
        })
        .catch(err => {
            console.log("error posting Pet", err)
            next(err);
        });

})

// READ: display Pet details
router.get("/:petId", (req, res, next) => {
    const id = req.params.petId;

    Pet.findById(id)
        .populate("user")
        .then((petDetails) => {
            res.render("pets/pet-details", petDetails);
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
});

// Edit pet display form 
router.get("/:petId/edit", (req, res, next) => {
    const id = req.params.petId;
    Pet.findById(id)
        .then((petDetails) => {
            res.render("pets/pet-edit", petDetails);
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
});


// Edit pet form
router.post("/:petId/edit", (req, res, next) => {

    const id = req.params.petId;

    const newDetails = {
        name: req.body.name,
        breed: req.body.breed,
        country: req.body.country,
        gender: req.body.gender,
        favouriteFood: req.body.favouriteFood,
    };

    Pet.findByIdAndUpdate(id, newDetails)
        .then((petFromDB) => {
            res.redirect(`/pets/${petFromDB._id}`);
        })
        .catch(err => {
            console.log("error updating pet in DB", err)
            next(err);
        });
});


// Delete a pet
router.post("/:petId/delete", (req, res, next) => {
    const id = req.params.petId;
    Pet.findByIdAndRemove(id)
        .then( () => {
            res.redirect("/pets");
        })
        .catch(err => {
            console.log('Error deleting a pet', err)
            next(err);
        })

});




module.exports = router;