const router = require("express").Router();
const users = require("./user.js");
const posts = require("./post.js");
const comments = require("./comment.js");
router.use("/users", users);
router.use("/posts", posts);
router.use("/comments", comments);

module.exports = router;
