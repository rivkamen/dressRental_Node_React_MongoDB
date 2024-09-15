const express = require("express")
const router = express.Router()
const ContactMessage = require("../controller/contactMessageController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", ContactMessage.getContactMessages)
router.post("/", ContactMessage.createContactMessage)
router.put("/:_id", ContactMessage.updateContactMessage)
router.delete("/:_id", ContactMessage.deleteContactMessage)
router.get("/:_id", ContactMessage.getContactMessageById)

module.exports = router