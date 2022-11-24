const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

const includeObjArray = [
  {
    model: Post,
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  },

  {
    model: Comment,
    attributes: ["id", "comment_text", "created_at"],
  },
];

// find all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbUserData) => {
      if (dbUserData) {
        res.json(dbUserData);
      } else {
        res.status(404).json({
          msg: "can not find any user, have some error with database",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "internal server error" });
    });
});

// get specific user with his posts using user id
router.get("/:id", (req, res) => {
  if (req.params.id) {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: includeObjArray,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "can not find any user with this id" });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// create new user
router.post("/", (req, res) => {
  if (req.body.username && req.body.email && req.body.password) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

      .then((dbUserData) => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ msg: "internal server error, we can not create new user." });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// login user
router.post("/login", (req, res) => {
  if (req.body.username) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(400)
            .json({ msg: "they have not any user with this username" });
        } else {
          // password validation check
          if (!dbUserData.checkPassword(req.body.password)) {
            res.status(500).json({ msg: "you entered password is incorrect!" });
          } else {
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json(dbUserData);
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "internal server error, we can not login " + req.body.username,
        });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// logout user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

// update user using his id
router.put("/:id", (req, res) => {
  if (req.body && req.params.id) {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ msg: "we can not find any user with this id" });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// delete specific user using his id
router.delete("/:id", (req, res) => {
  if (req.params.id) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ msg: "we can not find any user with this id" });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

module.exports = router;
