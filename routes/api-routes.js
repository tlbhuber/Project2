// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  /* Route for authenticating user's credentials */
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  /* Route for signing up a new user */
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  /* Route for creating a blog post */
  app.post("/api/post", function (req, res) {
    db.Post.create({
      title: req.body.title,
      strain: req.body.strain,
      entry: req.body.entry,
      effects: req.body.effects,
      UserId: req.body.UserId
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Route for getting all posts for a logged in user.
  app.get("/api/posts", (req, res) => {
    db.Post.findAll({
      where: { UserId: req.user.id }
    }).then(function (dbPost) {
      res.json(dbPost);
    })
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function (req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });



/* Route for creating a new strain */
app.post("/api/strain", function (req, res) {
  db.Strains.create({
    name: req.body.name,
    race: req.body.race,
    UserId: req.body.UserId
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// Route for getting all strains
app.get("/api/strains", (req, res) => {
  db.Strains.findAll({
    where: { UserId: req.user.id }
  }).then(function (dbPost) {
    res.json(dbPost);
  })
});

// Route for deleting a post
app.delete("/api/delete/:id", function (req, res) {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  })
})

// Route for deleting a strain
app.delete("/api/strain/:id", function (req, res) {
  db.Strains.destroy({
    where: {
      id: req.params.id
    }
  })
})

// Route for logging user out.
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
app.get("/user", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});
};