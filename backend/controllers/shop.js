const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
// const cloudinary = require("cloudinary");
const fs = require("fs");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email, latitude, longitude } = req.body; // Retrieve latitude and longitude from request body
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, async (err) => {
        if (err) {
          console.log("saving photo error: ", err);
          return res.status(500).json({ message: "Error in deleting photo" });
        }
      });
      return res.status(400).json({ message: "Seller already exists" });
    }

    if (!req.file) {
      console.log("No file uploaded error");
      return res.status(400).json({ message: "No Profile Pic uploaded" });
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      latitude: latitude, // Include latitude
      longitude: longitude, // Include longitude
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `https://localhost:3000/seller/activation/${activationToken}`;

    await sendMail({
      email: seller.email,
      subject: "Activate your Shop",
      message: `Hello ${seller.name}, please click on the link to activate your Shop: ${activationUrl}`,
    });
    
    return res.status(201).json({
      success: true,
      message: `Please check your email:- ${seller.email} to activate your Shop!`,
    });

  } catch (error) {
    console.error("Error in create-shop:", error);
    return res.status(500).json({ message: "Error in creating shop" });
  }
});


// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.JWT_KEY, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.JWT_KEY
      );

      if (!newSeller) {
        return res.status(400).json({ message: "Invalid token" });
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber, latitude, longitude } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return res.status(400).json({ message: "Seller already exists" });
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
        location: { 
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.error("Seller logic error:", error);
      return res.status(500).json({ message: "Error in activating seller" });
    }
  })
);

// // login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please provide the all fields!" });
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "User doesn't exists!" });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
          return res.status(400).json({ message: "Please provide the correct information" });
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return res.status(500).json({ message: `Error is: ${error.message}` });
    }
  })
);

// // load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return res.status(400).json({ message: "User doesn't exists" });
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// // log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
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

// // get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);


router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"), // Assuming 'upload' middleware is configured correctly
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get user and existing avatar path
      const existUser = await Shop.findById(req.seller._id);
      const existAvatarPath = `uploads/${existUser.avatar}`;

      // Delete existing avatar file
      if (fs.existsSync(existAvatarPath)) {
        fs.unlinkSync(existAvatarPath);
      }

      // Get the new avatar file path
      const fileUrl = req.file.filename; // Assuming 'req.file' is available after using 'upload.single'

      // Update user's avatar in the database
      const user = await Shop.findByIdAndUpdate(req.seller._id, {
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

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return res.status(400).json("User not found");
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// // all sellers --- for admin
// router.get(
//   "/admin-all-sellers",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const sellers = await Shop.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         sellers,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // delete seller ---admin
// router.delete(
//   "/delete-seller/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const seller = await Shop.findById(req.params.id);

//       if (!seller) {
//         return next(
//           new ErrorHandler("Seller is not available with this id", 400)
//         );
//       }

//       await Shop.findByIdAndDelete(req.params.id);

//       res.status(201).json({
//         success: true,
//         message: "Seller deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return res.status(400).json("Seller not found with this id");
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
);


module.exports = router;
