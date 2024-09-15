const express = require("express")
const router = express.Router()
const BookedDate = require("../controller/bookedDateController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", BookedDate.getBookedDates)
router.post("/", BookedDate.createBookedDate)
router.put("/:_id", BookedDate.updateBookedDate)
router.delete("/:_id", BookedDate.deleteBookedDate)
router.get("/:_id", BookedDate.getBookedDateById)

module.exports = router