const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// find all posts related to loged in user
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "can not get data" });
    });
});

// edit post
router.get("/edit/:id", withAuth, (req, res) => {
  if (req.params.id) {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
        } else {
          const post = dbPostData.get({ plain: true });
          res.render("editPost", { post, loggedIn: true });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
      });
  } else {
    res.status(500).json({ msg: "your request have some error" });
  }
});

// add a new post
router.get("/add", (req, res) => {
  res.render("addPost", { loggedIn: true });
});

module.exports = router;
