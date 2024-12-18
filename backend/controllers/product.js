const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const path = require('path');
const {upload}= require("../multer");
// const cloudinary = require("cloudinary");
// const ErrorHandler = require("../utils/ErrorHandler");
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
const fs= require("fs");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId, name, description, category, tags, originalPrice, discountPrice, stock } = req.body;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(400).json({ message: "Shop Id is invalid!" });
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = {
          shopId,
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          images: imageUrls,
          shop: shop,
        };

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: `error is: ${error.message}` });
    }
  })
);

// // get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  })
);  

// // delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId= req.params.id;
      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const fileName= imageUrl;
        const filePath= `uploads/${fileName}`;
        fs.unlink(filePath, (err)=>{
          if(err)
          {
            console.log(err);
          }
        })
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return res.status(400).json({ message: `Product is not found with this id` });
      }    

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  })
);

// // get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  })
);
module.exports = router;
