const express = require("express");
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel,getupdateHotel } = require("../controller/tourController");
const router = express.Router();

router.route("/:id").get(getHotels);

router.route("/:id/:title").get(getHotel);
router.route("/:uid/update/:tid").get(getupdateHotel);

router.route("/").post(createHotel);

router.route("/:id").put(updateHotel);

router.route("/:id").delete( deleteHotel);

module.exports = router;