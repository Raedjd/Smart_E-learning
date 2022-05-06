const router = require("express").Router();
const oneuserController = require("../controllers/oneuser");


//quiz routing
router.get("/all-users",oneuserController.allUsers)
router.get("/:oneuserId",oneuserController.getOneuser)



module.exports = router;  