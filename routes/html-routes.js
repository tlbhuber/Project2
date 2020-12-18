// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  /*
  /post, /allposts, and /dashboard require authentication 
  */
  app.get("/post", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  app.get("/allposts", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/allposts.html"));
  });

  app.get("/addstrain", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addstrain.html"));
  });

  app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

};
