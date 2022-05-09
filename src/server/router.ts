import { Router as ExpressRouter } from 'express';
import { IRequestHandler, IRouteConfig } from './server-type';

/**
 * A class for grouping related routes and their respective response
 */
class Router {
  /**
   * Routes incoming request to the controller
   * @param routeConfig - Configuration for router
   * @param handler - Handlers for processing the request
   * @returns Related routes from the server
   */
  public static addRouter(
    routeConfig: IRouteConfig,
    ...handler: IRequestHandler[]
  ) {
    const { path, method } = routeConfig;
    let { router } = routeConfig;

    if (!router) {
      router = ExpressRouter();
    }
    router[method](path, ...handler);
    return router;
  }
}

export default Router;
