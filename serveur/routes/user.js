const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

const auth = require("../middleware/forAuth");

//for authentification
router.post("/register", authController.signUp);
router.post("/activate-email", authController.activateEmail);
router.post("/login", authController.signIn);
router.post("/google-login", authController.googleLogin);
router.post("/facebook-login", authController.facebookLogin);
router.get("/logout", authController.logout);
router.post("/forget", authController.forgetPass);
router.post("/reset", auth.forResetPass, authController.resetPass);
router.patch(
  "/changepass",
  auth.requireAuth,
  userController.updatePasswordByUser
);
//user display
router.get(
  "/all-users",
  auth.requireAuth,
  //auth.authAdmin,
  userController.getAllUsers
);
router.get("/get-user", auth.requireAuth, userController.getOneUser);
router.patch("/modify-user", auth.requireAuth, userController.modifyUser);
router.delete("/delete-user", auth.requireAuth, userController.removeUser);
router.patch(
  "/update-role/:id",
  auth.requireAuth,
  userController.updateUserRole
);
router.patch("/disable", auth.requireAuth, userController.disableUser);
router.patch("/follow/:id", auth.requireAuth, userController.follow);
router.patch("/unfollow/:id", auth.requireAuth, userController.unfollow);

module.exports = router;
