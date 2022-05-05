const User = require("../models/User.model");
module.exports = (req, res, next) => {
const userID = req.params.userID;
  User.findById(userID)
  .then(userObject => {
    if (userObject.id !== req.session.user._id){
      return res.redirect("/auth/login");
    }
    next(); 
  })
};