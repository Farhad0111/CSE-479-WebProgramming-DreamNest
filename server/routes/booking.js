const router = require("express").Router();

const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const User = require("../models/User");

// ! CREATE BOOKING
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, totalPrice } = req.body;
    const listing = await Listing.findByIdAndUpdate(listingId, {
      isBooked: true,
    });

    const bookedAt = new Date();
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      bookedAt,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
});

// ! Get Booking
router.get("/getCustomer/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const booking = await Booking.find({ listingId: listingId }).populate(
      "customerId"
    );
    const customer = booking[0].customerId;

    res.status(200).json({
      data: customer,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: "Something went wrong getting booking",
    });
  }
});

module.exports = router;
