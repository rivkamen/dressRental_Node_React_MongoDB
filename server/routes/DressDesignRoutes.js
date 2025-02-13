// const express = require("express")
// const router = express.Router()
// const multer = require("multer")
// const path =require("path")

// const DressDesignController = require("../controller/dressDesignController")
// const verifyJWT = require("../middleware/verifyJWT")
// console.log("hi3");

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
// console.log("hii2");


// // router.use(verifyJWT)
// router.get("/", DressDesignController.getDressesDesign)
// router.post("/",upload.single('path'), DressDesignController.createDressDesign)
// router.put("/:_id", DressDesignController.updateDressDesign)
// router.delete("/:_id", DressDesignController.deleteDressDesign)
// router.get("/:_id", DressDesignController.getDressDesignById)
// router.put("/:_id/addDress", DressDesignController.addDressToDesign)
// router.put("/:_id/deleteDress", DressDesignController.deleteDressFromDesign)
// router.put("/:_id/take-dress", DressDesignController.takeDress)
// router.put("/:_id/return-dress", DressDesignController.returnDress)
// router.get("/:_id/available-dress", DressDesignController.getAvailableKeysForDate)



// module.exports = router


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const DressDesignController = require("../controller/dressDesignController");
const verifyJWT = require("../middleware/verifyJWT");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// router.use(verifyJWT)
router.get("/", DressDesignController.getDressesDesign);

// Handle multiple image uploads with `upload.array`
router.post("/", upload.array('path', 10), DressDesignController.createDressDesign);  // Limit to 10 images, adjust as needed
router.get("/rent", DressDesignController.getRentedDates);

router.put("/:_id", upload.array('path', 10), DressDesignController.updateDressDesign);
router.delete("/:_id", DressDesignController.deleteDressDesign);
router.get("/:_id", DressDesignController.getDressDesignById);
router.put("/:_id/addDress", DressDesignController.addDressToDesign);
router.put("/:_id/deleteDress", DressDesignController.deleteDressFromDesign);
router.put("/:_id/take-dress", DressDesignController.takeDress);
router.get("/:_id/available-dress", DressDesignController.getAvailableKeysForDate);
router.put("/:_id/cancel-dress",DressDesignController.cancelRent);
router.put("/:_id/return-dress", DressDesignController.returnDress);
router.put("/:_id/renting-dress", DressDesignController.rentingDress);


module.exports = router;
