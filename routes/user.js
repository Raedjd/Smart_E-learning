const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
//for authentification
router.post("/register", authController.signUp);
router.post("/activate-email", authController.activateEmail);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user display
router.get("/all-users", userController.getAllUsers);
router.get("/get-user:id", userController.singleUser);
router.put("/modify-user/:id", userController.modifyUser);
router.delete("/delete-user/:id", userController.removeUser);
module.exports = router;
