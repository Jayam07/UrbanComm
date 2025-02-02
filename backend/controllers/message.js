const Messages = require("../model/messages");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { upload } = require("../multer");

// const cloudinary = require("cloudinary");
const router = express.Router();

// create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData= req.body;

      if(req.files){
        const files= req.files;
        const imageUrls= files.map((file)=> `${file.fileName}`);
        messageData.images= imageUrls;
      }

      messageData.conversationId= req.body.conversationId;
      messageData.sender= req.body.sender;

      const message= new Messages({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined
      })

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return res.status(500).json({ message: `${error.message}` });
    }
  })
);

module.exports = router;
