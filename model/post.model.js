/**
 * Demo Mongoose model: Post.
 * Showcases schema design (types, validation, timestamps) and serves as a
 * reference for adding your own resources.
 */
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0, min: 0 },
    author: { type: String, trim: true, default: 'anonymous' },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
  }
);

module.exports = mongoose.model('Post', PostSchema);
