/**
 * Post service.
 * Business logic and data access for the demo "Post" resource.
 */
const Post = require('../model/post.model');

exports.list = async ({ page = 1, pageSize = 10 } = {}) => {
  page = Math.max(1, parseInt(page, 10) || 1);
  pageSize = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 10));

  const [total, list] = await Promise.all([
    Post.countDocuments(),
    Post.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize),
  ]);

  return { list, total, page, pageSize };
};

exports.detail = async (id) => {
  const doc = await Post.findById(id);
  if (!doc) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
  return doc;
};

exports.create = async (data) => Post.create(data);

exports.update = async (id, data) => {
  const doc = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
  return doc;
};

exports.remove = async (id) => {
  const doc = await Post.findByIdAndDelete(id);
  if (!doc) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
  return doc;
};
