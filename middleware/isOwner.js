const Pet = require("../models/Pets.model");
module.exports = (req, res, next) => {
  const id = req.params.petId;
  Pet.findById(id)
  .populate("user")
  .then(petDetails => {
    if (petDetails.user.id !== req.session.user._id){
      return res.redirect("/pets");
    }
    next(); 
  })
};
