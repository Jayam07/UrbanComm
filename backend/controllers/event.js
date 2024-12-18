const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const { upload } = require("../multer");
const fs= require("fs");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(400).json({ message: "Shop Id is invalid!" });
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images= imageUrls;
        eventData.shop= shop;

        const product = await Event.create(eventData);

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

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(400).json({ message: `error is: ${error.message}` });
  }
});

// // get all event of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  })
);  

// // delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId= req.params.id;
      const eventData = await Event.findById(eventId);

      eventData.images.forEach((imageUrl) => {
        const fileName= imageUrl;
        const filePath= `uploads/${fileName}`;
        fs.unlink(filePath, (err)=>{
          if(err)
          {
            console.log(err);
          }
        })
      });

      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return res.status(400).json({ message: `Event is not found with this id` });
      }    

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  })
);

module.exports = router;
