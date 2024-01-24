import { createCommentHandler, deleteCommentHandler, getCommentsHandler } from "../handlers/comment.handler.js";

const routes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/api/comments/:post_id',
    handler: getCommentsHandler
  });

  app.route({
    method: 'POST',
    url: '/api/comments/:post_id',
    handler: createCommentHandler
  });

  app.route({
    method: 'DELETE',
    url: '/api/comments/:comment_id',
    handler: deleteCommentHandler
  })

};

export default routes;