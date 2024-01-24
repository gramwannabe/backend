import { findUserByEmailHandler, getProfileMeHandler, getUserProfileHandler, login, loginWithGmailHandler, register, updateProfileHandler, updateProfilePictureHandler } from "../handlers/user.handler.js";
import { requestLoginSchema, requestRegisterSchema, responseLoginSchema, responseRegisterSchema } from "../schemas/user.schema.js";

const routes = async (app, options) => {
  app.route({
    method: 'POST',
    url: '/api/users/register',
    handler: register,
    schema: {
      body: requestRegisterSchema,
      response: responseRegisterSchema
    },
  });

  app.route({
    method: 'POST',
    url: '/api/users/login',
    handler: login,
    schema: {
      body: requestLoginSchema,
      response: responseLoginSchema
    },
  });

  app.route({
    method: 'GET',
    url: '/api/users/login/gmail',
    handler: loginWithGmailHandler
  })

  // TODO: schema
  app.route({
    method: 'PUT',
    url: '/api/users/profile',
    handler: updateProfileHandler
  })

  // TODO: schema
  app.route({
    method: 'GET',
    url: '/api/users/profile/me',
    handler: getProfileMeHandler
  })

  app.route({
    method: 'GET',
    url: '/api/users/profile/:user_id',
    handler: getUserProfileHandler
  })

  // TODO: schema
  app.route({
    method: 'PUT',
    url: '/api/users/profile/picture',
    handler: updateProfilePictureHandler
  })

  // TODO: schema
  app.route({
    method: 'GET',
    url: '/api/users/email',
    handler: findUserByEmailHandler
  })

};

export default routes;