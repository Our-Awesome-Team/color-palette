const asyncHandler = require('express-async-handler');

const FavoriteColor = require('../models/favoriteColorModel');

// @desc    Get favoriteColors
// @route   GET /api/favoriteColors
// @access  Private
const getFavoriteColors = asyncHandler(async (req, res) => {
  const favoriteColors = await FavoriteColor.find({ user: req.user.id });

  res.status(200).json(favoriteColors);
});

// @desc    Set favoriteColor
// @route   POST /api/favoriteColors
// @access  Private
const setFavoriteColor = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error('Please add a hex field');
  }

  const favoriteColor = await FavoriteColor.create({
    id: req.body.id,
    tags: req.body.tags,
    hex: req.body.hex,
    user: req.user.id,
  });

  res.status(200).json(favoriteColor);
});

// @desc    Delete favoriteColor
// @route   DELETE /api/favoriteColors/:id
// @access  Private
const deleteFavoriteColor = asyncHandler(async (req, res) => {
  const favoriteColor = await FavoriteColor.findById(req.params.id);

  if (!favoriteColor) {
    res.status(400);
    throw new Error('Favorite color not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the favoriteColor user
  if (favoriteColor.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await favoriteColor.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getFavoriteColors,
  setFavoriteColor,
  deleteFavoriteColor,
};
