const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const auth = require("../middleware/forAuth");
//for authentification
router.post("/register", authController.signUp);
router.post("/activate-email", authController.activateEmail);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/forget", authController.forgetPass);
router.post("/reset", auth.forResetPass, authController.resetPass);

//user display
router.get("/all-users", auth.requireAuth, userController.getAllUsers);
router.get("/get-user/:id", auth.requireAuth, userController.singleUser);
router.put("/modify-user/:id", auth.requireAuth, userController.modifyUser);
router.delete("/delete-user/:id", auth.requireAuth, userController.removeUser);
module.exports = router;
