const asyncHandler = require('express-async-handler');

const FavoriteScheme = require('../models/favoriteSchemeModel');

// @desc    Get favorite schemes
// @route   GET /api/favoriteSchemes
// @access  Private
const getFavoriteSchemes = asyncHandler(async (req, res) => {
  const favoriteSchemes = await FavoriteScheme.find({ user: req.user.id });

  res.status(200).json(favoriteSchemes);
});

// @desc    Set favorite scheme
// @route   POST /api/favoriteSchemes
// @access  Private
const setFavoriteScheme = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error('Please add a hex field');
  }

  const favoriteScheme = await FavoriteScheme.create({
    id: req.body.id,
    tags: req.body.tags,
    colors: req.body.colors,
    user: req.user.id,
  });

  res.status(200).json(favoriteScheme);
});

// @desc    Delete favorite scheme
// @route   DELETE /api/favoriteSchemes/:id
// @access  Private
const deleteFavoriteScheme = asyncHandler(async (req, res) => {
  const favoriteScheme = await FavoriteScheme.findOne({ id: req.params.id });

  if (!favoriteScheme) {
    res.status(400);
    throw new Error('Favorite scheme not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the favoriteScheme user
  if (favoriteScheme.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await favoriteScheme.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getFavoriteSchemes,
  setFavoriteScheme,
  deleteFavoriteScheme,
};
