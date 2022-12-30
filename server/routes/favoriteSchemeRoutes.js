const express = require('express');
const router = express.Router();
const {
  getFavoriteSchemes,
  setFavoriteScheme,
  deleteFavoriteScheme,
} = require('../controllers/favoriteSchemeController');

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getFavoriteSchemes)
  .post(protect, setFavoriteScheme);
router.route('/:id').delete(protect, deleteFavoriteScheme);

module.exports = router;
