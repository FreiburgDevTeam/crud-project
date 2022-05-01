// requirements
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

// import environment variables 
require('dotenv').config();

// middleware to control the access
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// route GET to display user profile
router.get('/profile', isLoggedIn, (req, res, next) => {

    res.render("user/profile")
  });

// route GET to display user form
router.get('/edit/:userID', isLoggedIn, (req, res, next) => {
  const userID = req.params.userID;
  // search user by ID in DB
  User.findById(userID)
    .then( userObject => {
      res.render('user/edit', {user: userObject});
    })
    .catch( err => {
      console.log("Error searching a user by ID in DB", err);
      next(err)
    })  
  });

// route POST to udapte user
router.post('/edit/:userID', isLoggedIn, (req, res, next) => {
  const userID = req.params.userID;
  const newDetails = {
    name: req.body.name,
    email: req.body.email,
    telephone: req.body.telephone
  }
  // search and update user in DB using ID
  User.findByIdAndUpdate(userID, newDetails, { new: true })
    .then( response => {
      // update session
      req.session.user = response;
      res.redirect('/user/profile')
    })
    .catch( err => {
      console.log("Error searching a user by ID in DB", err);
      next(err)
    }) 
})

// route to delete user
router.post('/edit/:userID/delete', isLoggedIn, (req, res, next) => {
  const userID = req.params.userID;
    User.findByIdAndRemove(userID)
    .then( () => {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .render("auth/logout", { errorMessage: err.message });
        }
        res.redirect("/");
      });
    })
    .catch( err => {
      console.log("Error deleting a user in DB", err);
      next(err)
    }) 
})

module.exports = router;