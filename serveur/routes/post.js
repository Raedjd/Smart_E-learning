const router = require("express").Router();
const postController = require("../controllers/post");
const auth = require("../middleware/forAuth");

//for posts
router.get("/getposts", auth.requireAuth, postController.readPost);
router.post("/addpost", auth.requireAuth, postController.createPost);
router.put("/update-post/:id", auth.requireAuth, postController.updatePost);
router.delete("/remove-post/:id", auth.requireAuth, postController.deletePost);
router.patch("/like-post/:id", auth.requireAuth, postController.likePost);
router.patch("/unlike-post/:id", auth.requireAuth, postController.unlikePost);

//for comments
router.patch(
  "/add-comPost/:id",
  auth.requireAuth,
  postController.createcommentPost
);
router.patch(
  "/update-comPost/:id",
  auth.requireAuth,
  postController.updateCommentPost
);

router.patch(
  "/remove-comPost/:id",
  auth.requireAuth,
  postController.deleteCommentPost
);
module.exports = router;
