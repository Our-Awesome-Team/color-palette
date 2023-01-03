const express = require('express');
const router = express.Router();
const {
  getHistory,
  setHistory,
  deleteHistoryItem,
  deleteHistory,
} = require('../controllers/historyController');

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getHistory)
  .post(protect, setHistory)
  .delete(protect, deleteHistory);
router.route('/:id').delete(protect, deleteHistoryItem);

module.exports = router;
