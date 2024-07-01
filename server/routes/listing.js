const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User");
const Booking = require("../models/Booking");

// ! Configuration Multer for File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/listing/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Math.random().toString(36).substring(2, 12) + "-" + file.originalname
    ); // Use the original file name
  },
});

const upload = multer({ storage });

// ! CREATE NEW LISTING
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // Take the information from the form
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      guestCount,
      bedroomCount,
      bathroomCount,
      drawingroomCount,
      diningroomCount,
      balconyCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      date,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded.",
      });
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      guestCount,
      bedroomCount,
      bathroomCount,
      drawingroomCount,
      diningroomCount,
      balconyCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      date,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({
      status: "fail",
      message: "Fail to create Listing",
      error: err.message,
    });
    console.log(err);
  }
});

// ! GET LISTINGS BY CATEGORY
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({
        category: qCategory,
        isBooked: false,
      }).populate("creator");
    } else {
      listings = await Listing.find({
        isBooked: false,
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

// ! GET LISTINGS BY SEARCH
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

// ! LISTING DETAILS
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    // If listing.isBooked then get who bookedIt

    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});

// ! Delete Listing
router.delete("/:listingId/:hostId", async (req, res) => {
  try {
    const { listingId, hostId } = req.params;

    await Listing.findByIdAndDelete(listingId);

    res.status(204).json({ message: "Success", data: null });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing deletion failed", error: err.message });
  }
});

module.exports = router;
