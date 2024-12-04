
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path =require("path")

const RentController  = require('../controller/rentalHistoryController');

router.get('/', RentController.getRentalHistory );

module.exports = router;
