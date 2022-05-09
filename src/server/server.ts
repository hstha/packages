import express from 'express';
import cors from 'cors';
import {
  IRequestHandler,
  IApplication,
  IRouter,
  IPathConfig,
  HTTPMethods,
  IPath,
  IServer,
} from './server-type';

/**
 * A class responsible managing incoming request and outgoing response
 */
class Server {
  // eslint-disable-next-line no-use-before-define
  private static serverInstance: Server;

  private app: IApplication;

  private constructor(options: IServer) {
    this.app = express();
    this.setupMiddleware(options);
  }

  /**
   * Ensures no duplicate instance of the class is created
   * @param options - Configuration data while creating server
   * @returns Instance of the class
   */
  public static getInstance(options: IServer) {
    if (!this.serverInstance) {
      this.serverInstance = new Server(options);
    }

    return this.serverInstance;
  }

  /**
   * Contains middleware that needs to be run in the server
   * @param options - Configuration data while setting middleware
   */
  private setupMiddleware(options: IServer) {
    this.use(() =>
      cors({
        origin: options.origin,
        methods: options.methods,
        allowedHeaders: options.allowedHeaders,
      }),
    );
    this.use(() =>
      express.urlencoded({
        extended: false,
      }),
    );
    this.use(express.json);
  }

  /**
   * Adds additional middleware to the server
   * @param handler - Middleware for the server
   */
  public use(handler: Function) {
    this.app.use(handler());
  }

  /**
   * Routes request to the given path to the router
   * @param pathConfig - Api path
   * @param router - Instance of router
   */
  // eslint-disable-next-line no-unused-vars
  public route(pathConfig: IPath, router: IRouter): void;

  /**
   * Routes the api request to the server
   * @param pathConfig - Configuration method and api path
   * @param handler - Handlers for processing the request
   */
  // eslint-disable-next-line no-unused-vars
  public route(pathConfig: IPathConfig, handler: IRequestHandler[]): void;

  /**
   * Routes request to the given path to handler
   * @param path - Api path
   * @param handler - Handlers for processing the request
   */
  // eslint-disable-next-line no-unused-vars
  public route(pathConfig: IPath, handler: IRequestHandler[]): void;

  /* eslint-disable prefer-rest-params */
  public route() {
    const { path, method } = arguments[0];

    if (method) {
      this.app[method as HTTPMethods](path, ...arguments[1]);
      return;
    }

    if (!Array.isArray(arguments[1])) {
      this.app.use(path, arguments[1]);
      return;
    }

    this.app.use(path, ...arguments[1]);
  }
  /* eslint-enable prefer-rest-params */

  /**
   * Listens to the given port
   * @param portNumber - Port where server listens
   * @param cb - Function that executes after server listens to the port
   */
  // eslint-disable-next-line default-param-last
  public listen(portNumber = 5000, cb?: Function) {
    this.app.listen(portNumber, () => {
      if (typeof cb !== 'function') {
        // eslint-disable-next-line no-console
        console.info(`App is running in port ${portNumber}`);
        return;
      }
      cb();
    });
  }
}

export default Server;
