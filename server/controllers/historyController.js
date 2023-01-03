const asyncHandler = require('express-async-handler');

const History = require('../models/historyModel');

// @desc    Get history
// @route   GET /api/history
// @access  Private
const getHistory = asyncHandler(async (req, res) => {
  const history = await History.find({ user: req.user.id });

  res.status(200).json(history);
});

// @desc    Set history
// @route   POST /api/history
// @access  Private
const setHistory = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error('Something went wrong');
  }

  const historyItem = await History.create({
    id: req.body.id,
    title: req.body.title,
    date: req.body.date,
    user: req.user.id,
  });

  res.status(200).json(historyItem);
});

// @desc    Clear history item
// @route   DELETE /api/history/:id
// @access  Private
const deleteHistoryItem = asyncHandler(async (req, res) => {
  const historyItem = await History.findOne({ id: req.params.id });

  if (!historyItem) {
    res.status(400);
    throw new Error('History item not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the favoriteColor user
  if (historyItem.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await historyItem.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Clear history
// @route   DELETE /api/history
// @access  Private
const deleteHistory = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // // Make sure the logged in user matches the favoriteColor user
  // if (historyItem.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }
  const historyItem = await History.findByIdAndDelete({ user: req.user.id });

  res.status(200).json('Success');
});

module.exports = {
  getHistory,
  setHistory,
  deleteHistoryItem,
  deleteHistory,
};
