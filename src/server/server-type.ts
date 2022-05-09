import {
  Request,
  Response,
  NextFunction,
  Application,
  IRouter as IExpressRouter,
} from 'express';

export interface IRequest extends Request {}
export interface IResponse extends Response {}
export interface INext extends NextFunction {}
export interface IRouter extends IExpressRouter {}
export interface IApplication extends Application {}

export type HTTPMethods =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export type IRequestHandler = (
  // eslint-disable-next-line no-unused-vars
  req: IRequest,
  // eslint-disable-next-line no-unused-vars
  res: IResponse,
  // eslint-disable-next-line no-unused-vars
  next?: INext,
) => void;

export interface IPath {
  path: string;
}
export interface IPathConfig extends IPath {
  method: HTTPMethods;
}

export interface IRouteConfig extends IPathConfig {
  router?: IRouter;
}

export interface IServer {
  origin: boolean | string | RegExp | (boolean | string | RegExp)[];
  methods?: string | string[];
  allowedHeaders?: string | string[];
}
