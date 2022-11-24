const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

const includeObjArray = [
  {
    model: User,
    attributes: ["username"],
  },
  {
    model: Comment,
    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
    include: {
      model: User,
      attributes: ["username"],
    },
  },
];

const attributesArray = ["id", "content", "title", "created_at"];

// find all post with there comments
router.get("/", (req, res) => {
  Post.findAll({
    attributes: attributesArray,
    order: [["created_at", "DESC"]],
    include: includeObjArray,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "we have some server error" });
    });
});

// find specific post using it's ID
router.get("/:id", (req, res) => {
  if (req.params.id) {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: attributesArray,
      include: includeObjArray,
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ msg: "They have no post found with this id" });
        } else {
          res.json(dbPostData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "we have some server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// create a new post
router.post("/", withAuth, (req, res) => {
  if (req.session && req.body.title && req.body.content) {
    Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: `we can not create your ${req.body.title} post, we have some server error`,
        });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// for update post using it's ID
router.put("/:id", withAuth, (req, res) => {
  if (req.params.id && req.body.title && req.body.content) {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ msg: "They have no post found with this id" });
        } else {
          res.json(dbPostData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: `we can not update your ${req.body.title} post, we have some server error`,
        });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// delete post using it's ID
router.delete("/:id", withAuth, (req, res) => {
  if (req.params.id) {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ msg: "can not find any post with this id" });
        } else {
          res.json(dbPostData);
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            msg: `can not delete your post with${req.params.id} id, we have some server error.`,
          });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

module.exports = router;
