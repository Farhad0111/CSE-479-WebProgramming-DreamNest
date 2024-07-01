const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

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

// ! User register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // Take all info from the form
    const { firstName, lastName, email, phone, profession, password } =
      req.body;

    // Uploaded file  is available as req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // path to the uploaded profile photo
    const profileImagePath = profileImage.path;
    // + Math.random().toString(36).substring(2, 12);

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists!",
      });
    }

    /* Hass the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      profession,
      password: hashedPassword,
      profileImagePath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res.status(200).json({
      status: "success",
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "fail",
      message: "Registration failed!",
      error: err.message,
    });
  }
});

// ! User Login
router.post("/login", async (req, res) => {
  try {
    // Take the infomation from the form
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        status: "fail",
        message: "User doesn't exist!",
      });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
});

module.exports = router;
