const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  title: String,
  createdBy: String, // email or userId
  members: [String], // email list
  items: [
    {
      name: String,
      imageUrl: String,
      price: Number,
      addedBy: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
