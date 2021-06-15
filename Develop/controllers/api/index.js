const router = require("express").Router();
const userRoutes = require("./userRoutes")
const commentRoute = require("./comments")

router.use("/users", userRoutes);
router.use("/comments", commentRoutes)

module.exports = router;

