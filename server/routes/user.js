const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

// ! Configuration Multer for file Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profile/"); // store uploaded files in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Math.random().toString(36).substring(2, 12) + "-" + file.originalname
    ); // use the original filename
  },
});

const upload = multer({ storage });

// ! GET TRIP LIST
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
});

// ! ADD LISTING TO WISHLIST
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

// ! GET PROPERTY LIST
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: "Can not find properties!",
      error: err.message,
    });
  }
});

// ! GET RESERVATION LIST
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
});

// ! Edit Profile
router.patch("/:userId", upload.single("profileImage"), async (req, res) => {
  try {
    // Take all info from the form
    const { firstName, lastName, about, phone, profession } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    // Uploaded file  is available as req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    const updated_info = {
      firstName,
      lastName,
      about,
      phone,
      profession,
      profileImagePath,
    };

    const updated_user = await User.findByIdAndUpdate(
      req.params.userId,
      updated_info
    );
    updated_user.email = user.email;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    console.log(updated_user);

    res.status(200).json({
      user: updated_user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "Update profile failed",
    });
  }
});

module.exports = router;
