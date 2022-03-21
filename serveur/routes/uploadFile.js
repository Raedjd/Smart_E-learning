const router = require("express").Router();
const uploadFile = require("../middleware/forUploadFile");
const uploadCtrl = require("../controllers/uploadFileCtrl");
const auth = require("../middleware/forAuth");
const userController = require("../controllers/user");

router.post(
  "/upload_avatar",
  uploadFile,
  auth.requireAuth,
  uploadCtrl.uploadAvatar
);

router.post(
  "/teacherData",
  uploadFile,
  auth.requireAuth,
  uploadCtrl.uploadDataToBecomeTeacher
);
module.exports = router;
