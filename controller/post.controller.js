/**
 * Post controller.
 * Thin layer: parse the request, delegate to the service, shape the response.
 */
const postService = require('../service/post.service');

exports.list = async (ctx) => {
  ctx.success(await postService.list(ctx.query));
};

exports.detail = async (ctx) => {
  ctx.success(await postService.detail(ctx.params.id));
};

exports.create = async (ctx) => {
  ctx.success(await postService.create(ctx.request.body || {}), 'created');
};

exports.update = async (ctx) => {
  ctx.success(await postService.update(ctx.params.id, ctx.request.body || {}), 'updated');
};

exports.remove = async (ctx) => {
  await postService.remove(ctx.params.id);
  ctx.success(null, 'deleted');
};
