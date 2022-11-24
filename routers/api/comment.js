const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// find all comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "some server error" });
    });
});

// find specific post using it's id
router.get("/:id", (req, res) => {
  if (req.params.id) {
    Comment.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCommentData) => {
        if (dbCommentData) {
          res.json(dbCommentData);
        } else {
          res
            .status(404)
            .json({ msg: "we can not find any data with this id." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "we have server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// create new comment
router.post("/", withAuth, (req, res) => {
  if (req.session && req.body.comment_text && req.body.post_id) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "can not create your comment" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// update specific comment using it's id
router.put("/:id", withAuth, (req, res) => {
  if (req.params.id && req.body.comment_text) {
    Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbCommentData) => {
        if (!dbCommentData) {
          res
            .status(404)
            .json({ msg: "we can not find any data with this id." });
        } else {
          res.json(dbCommentData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "we have server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

// delete specific comment using it's id
router.delete("/:id", withAuth, (req, res) => {
  if (req.params.id) {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCommentData) => {
        if (!dbCommentData) {
          res
            .status(404)
            .json({ msg: "we can not find any data with this id." });
        } else {
          res.json(dbCommentData);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "we have server error" });
      });
  } else {
    res.status(400).json({
      msg: "your requested data have some missing data, please check your request again.",
    });
  }
});

module.exports = router;
