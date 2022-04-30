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
router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile");
  });

// route GET to display user form
router.get("/edit", isLoggedIn, (req, res, next) => {
    res.render("user/profile");
  });

module.exports = router;