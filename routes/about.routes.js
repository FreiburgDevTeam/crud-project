const router = require("express").Router();


router.get("/about", (req, res, next) => {
  res.render("about/about-page");
});

module.exports = router;

module.exports = router;