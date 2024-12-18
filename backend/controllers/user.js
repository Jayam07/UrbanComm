const express = require("express");
const User = require("../model/user");
const Shop = require("../model/shop");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const sendMail = require("../utils/sendMail");
const fs = require("fs");
const { json } = require("body-parser");
const sendToken = require("../utils/jwtToken");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("saving photo error: ", err);
          return res.status(500).json({ message: "error in deleting photo" });
        }
      })
      return res.status(400).json({ message: "User already exists" });
    }
    if (!req.file) {
      console.log("No file uploaded error");
      return res.status(400).json({ message: "No Profile Pic uploaded" });
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      return res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error in activation function" });
    }

  } catch (error) {
    console.error("Error in create-user:", error);
    return res.status(500).json({ message: "Error in creating user" });
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: "5m",
  });
};

router.get("/images/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    res.sendFile(filePath);

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
});

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.JWT_KEY
      );

      if (!newUser) {
        return res.status(400).json({ message: "invalid token" });
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "user already exist" });
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return res.status(500).json({ message: "Error in catchAsyncErrors function" });
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please provide the all fields!" });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "User doesn't exists!" });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Please provide the correct information" });
      }

      sendToken(user, 201, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// // load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ message: "User Dosent Exist" });
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// // log out user
router.get(
  "/user/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json("User not found");
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(400).json("Please provide the correct information");
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"), // Assuming 'upload' middleware is configured correctly
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get user and existing avatar path
      const existUser = await User.findById(req.user.id);
      const existAvatarPath = `uploads/${existUser.avatar}`;

      // Delete existing avatar file
      if (fs.existsSync(existAvatarPath)) {
        fs.unlinkSync(existAvatarPath);
      }

      // Get the new avatar file path
      const fileUrl = req.file.filename; // Assuming 'req.file' is available after using 'upload.single'

      // Update user's avatar in the database
      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      // Respond with success message and updated user object
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ message: error.message });
    }
  })
);


// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return res.status(400).json(`${req.body.addressType} address already exists`);
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return res.status(400).json("Old password is incorrect!");
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json("Password doesn't matched with each other!");
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json("User is not available with this id");
      }

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

router.get(
  "/find-nearest-store",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const latitude = parseFloat(req.query.latitude);
      const longitude = parseFloat(req.query.longitude);
      const store_data = await Shop.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            distanceField: "dist.calculated",
            maxDistance: 1000 * 1609, // Converted maxDistance to meters
            spherical: true
          }
        }
      ]);
      res.status(200).send({ success: true, msg: "Store details", store_data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

module.exports = router;