const { Post, User, Comment } = require("../models");
const router = require("express").Router();

// find all posts
router.get("/", (req, res) => {
  Post.findAll({
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
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "can not get data" });
    });
});

// login user
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// signup user
router.get("/signup", (req, res) => {
  res.render("signup");
});

// get single post using it's id
router.get("/post/:id", (req, res) => {
  if (req.params.id) {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ msg: "can not found post with this id" });
        } else {
          const post = dbPostData.get({ plain: true });
          res.render("singlePost", { post, loggedIn: req.session.loggedIn });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "can not found any post" });
      });
  } else {
    res.status(500).json({ msg: "your request have some error" });
  }
});

module.exports = router;
