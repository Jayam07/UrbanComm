const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: [
      {
        type: String, // Assuming images are stored as strings (URLs or file paths)
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
