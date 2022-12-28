const mongoose = require('mongoose');

const favoriteColorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    id: {
      type: Number,
      required: true,
    },
    hex: {
      type: String,
      required: true,
    },
    tags: {
      type: [{ id: Number, name: String }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FavoriteColor', favoriteColorSchema);
