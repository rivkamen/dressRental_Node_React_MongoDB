const express = require("express")
const router = express.Router()
const UserController = require("../controller/userController")
const verifyJWT = require("../middleware/verifyJWT")

// router.use(verifyJWT)
router.get("/", UserController.getUsers)
router.post("/",UserController.createUser)
router.put("/:_id", UserController.updateUser)
router.delete("/:_id", UserController.deleteUser)
router.get("/:_id", UserController.getUserById)
router.get("/phone/:phone", UserController.getUserByPhone)


module.exports = router