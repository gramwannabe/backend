import { healthcheckHandler } from "../handlers/healthcheck.handler.js";

const routes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/healthcheck',
    handler: healthcheckHandler
  });

};

export default routes;