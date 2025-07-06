const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// GET wishlists by user
router.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const wishlists = await Wishlist.find({ owner: email });
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlists" });
  }
});

// POST create new wishlist
router.post("/", async (req, res) => {
  const { title, owner, creatorName } = req.body;

  if (!title || !owner || !creatorName) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newList = new Wishlist({
      title,
      owner,
      creatorName,
      members: [owner],
      items: [],
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ error: "Failed to create wishlist" });
  }
});

// GET wishlist by ID
router.get("/:id", async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) return res.status(404).json({ error: "Not found" });
    res.json(wishlist);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// POST add item to wishlist
router.post("/:id/items", async (req, res) => {
  const { name, imageUrl, price, addedBy } = req.body;

  if (!name || !addedBy) return res.status(400).json({ error: "Missing fields" });

  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.items.push({ name, imageUrl, price, addedBy });
    await wishlist.save();

    res.status(201).json(wishlist);
  } catch {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// DELETE item from wishlist
router.delete("/:wishlistId/items/:itemIndex", async (req, res) => {
  try {
    const { wishlistId, itemIndex } = req.params;
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.items.splice(itemIndex, 1); // remove item
    await wishlist.save();

    res.json(wishlist);
  } catch {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// PUT update item
router.put("/:wishlistId/items/:itemIndex", async (req, res) => {
  try {
    const { wishlistId, itemIndex } = req.params;
    const { name, imageUrl, price } = req.body;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    const item = wishlist.items[itemIndex];
    if (!item) return res.status(404).json({ error: "Item not found" });

    // update fields
    if (name) item.name = name;
    if (imageUrl) item.imageUrl = imageUrl;
    if (price !== undefined) item.price = price;

    await wishlist.save();
    res.json(wishlist);
  } catch {
    res.status(500).json({ error: "Failed to update item" });
  }
});


module.exports = router;
