import { createPost, deletePostHandler, getPostDetail, getPosts, getPostsMe, getUserPosts, putPostDescription } from "../handlers/post.handlers.js";

const routes = async (app, options) => {
  app.route({
    method: 'POST',
    url: '/api/posts',
    handler: createPost
  });

  app.route({
    method: 'GET',
    url: '/api/posts',
    handler: getPosts
  });

  app.route({
    method: 'GET',
    url: '/api/posts/me',
    handler: getPostsMe
  });

  app.route({
    method: 'GET',
    url: '/api/posts/user/:user_id',
    handler: getUserPosts
  })

  app.route({
    method: 'GET',
    url: '/api/posts/:post_id',
    handler: getPostDetail
  });

  app.route({
    method: 'PUT',
    url: '/api/posts/:post_id',
    handler: putPostDescription
  });

  app.route({
    method: 'DELETE',
    url: '/api/posts/:post_id',
    handler: deletePostHandler
  })
};

export default routes;