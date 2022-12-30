const mongoose = require('mongoose');

const favoriteSchemeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    id: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    tags: {
      type: [{ id: String, name: String }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FavoriteScheme', favoriteSchemeSchema);
