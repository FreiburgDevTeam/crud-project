const { default: axios } = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const isOwner = require("../middleware/isOwner");
const { populate } = require("../models/Pets.model");
const Pet = require("../models/Pets.model");
const User = require("../models/User.model");
const router = require("./user.routes");

// READ: display list of Pets
router.get("/", (req, res, next) => {
    let loggedIn = false;
    if (req.session.user){
        loggedIn = true 
    } 
    
    Pet.find(req.query)
        .populate("user")
        .then(petsArr => {
            Pet.find()
                .then((allPets) => {
                    if (petsArr.length === 0 ) {
                        res.render("pets/pets-list", { pets: allPets, loggedIn, noResults: true})   
                      } 
                      else {
                          res.render("pets/pets-list", { pets: petsArr, loggedIn, noresults: false}) 
                      }
                })
        })
         
        .catch(err => {
        console.log("error getting pets from DB", err)
        next(err);
        })
});

// create a Pet
router.get("/create", isLoggedIn, (req, res, next) => {
    let breedList;
    // GET breeds from dog API
    axios.get('https://dog.ceo/api/breeds/list')
    .then((response) => {
        breedList = response.data.message;
            // query to search the user of the session
            User.find(req.session.user)
            .then(userName => {
                res.render("pets/pet-create", {user: userName, breeds: breedList});
            })
      })
    .catch(err => {
        console.log("error getting user from DB", err)
        next(err);
    });
});

// process create form
router.post("/create", isLoggedIn, (req, res, next) => {
    const avatarDogs =["dog1.png", "dog2.png", "dog3.png", "dog4.png", "dog5.png"];
    const avatarCats = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"];
    if (req.body.type === 'dog'){
        let randomIndex = Math.floor(Math.random()*avatarDogs.length);
        req.body.avatar = avatarDogs[randomIndex];
    } else if (req.body.type === 'cat'){
        let randomIndex = Math.floor(Math.random()*avatarCats.length);
        req.body.avatar = avatarCats[randomIndex];
    }

    const newPet = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        city: req.body.city,
        gender: req.body.gender,
        user: req.session.user._id,
        favouriteFood: req.body.favouriteFood,
        description: req.body.description,
        avatar: req.body.avatar
    }
   
    Pet.create(newPet)
        .then(() => {
            res.redirect("/pets");
        })
        .catch(err => {
            console.log("error posting Pet", err)
            next(err);
        });

});

// READ: display Pet details
router.get("/:petId",(req, res, next) => {
    

    const id = req.params.petId;
    Pet.findById(id)
        .populate("user")
        .then(petDetails => {

            if (!req.session.user){
                res.render("pets/pet-details", {pet: petDetails, userIn: false})
            } else if (petDetails.user.id === req.session.user._id){
                res.render("pets/pet-details", {pet: petDetails, isOwner: true, userIn: true})
            } else {
                res.render("pets/pet-details", {pet: petDetails, isOwner: false, userIn: true})
            }
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
});

// Edit pet display form 
router.get("/:petId/edit", isLoggedIn, isOwner, (req, res, next) => {
    const id = req.params.petId;
    Pet.findById(id)
        .then(petDetails => {
                res.render("pets/pet-edit", petDetails);
        })
        .catch(err => {
            console.log("error getting pet details from DB", err)
            next(err);
        });
});

// route to procces the pet form
router.post("/:petId/edit", isLoggedIn, isOwner, (req, res, next) => {

    const id = req.params.petId;

    const newDetails = {
        name: req.body.name,
        breed: req.body.breed,
        type: req.body.type,
        city: req.body.city,
        gender: req.body.gender,
        favouriteFood: req.body.favouriteFood,
        description: req.body.description,
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
router.post("/:petId/delete", isLoggedIn, isOwner,(req, res, next) => {


    const id = req.params.petId;
    Pet.findByIdAndRemove(id)
        .then( petId => {
            if (req.session.user._id == petId.user._id) {
                res.redirect("/pets");
            } else( res.render("pets/pet-notAnOWner"))
            
        })
        .catch(err => {
            console.log('Error deleting a pet', err)
            next(err);
        })

});




module.exports = router;


