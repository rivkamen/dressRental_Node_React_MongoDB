const express = require("express")
const router = express.Router()
const multer = require("multer")
const path =require("path")

const DressController = require("../controller/dressController")
const verifyJWT = require("../middleware/verifyJWT")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/upload/'));
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });


router.use(verifyJWT)
router.get("/", DressController.getDresses)
router.put("/", DressController.createDress)
router.put("/:_id", DressController.updateDress)
router.delete("/:_id", DressController.deleteDress)
router.get("/:_id", DressController.getDressById)

module.exports = router