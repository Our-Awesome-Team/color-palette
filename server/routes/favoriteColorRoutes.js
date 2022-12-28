const express = require('express');
const router = express.Router();
const {
  getFavoriteColors,
  setFavoriteColor,
  deleteFavoriteColor,
} = require('../controllers/favoriteColorController');

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getFavoriteColors)
  .post(protect, setFavoriteColor);
router.route('/:id').delete(protect, deleteFavoriteColor);

module.exports = router;
