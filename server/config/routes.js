const express = require("express");
const router = express.Router();
const enquiryController = require("../app/controllers/enquiryController");


router.get("/api/enquiries", enquiryController.list);
router.post("/api/enquiries", enquiryController.create);
router.get("/api/enquiries/:id",enquiryController.show)

module.exports = router;
