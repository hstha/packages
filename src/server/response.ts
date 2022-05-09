import { IResponse } from './server-type';

/**
 * A class containing functionality for server response
 */
class Response {
  /**
   * Sets request successes HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static Ok(res: IResponse, message?: any) {
    res.status(200).send(message);
  }

  /**
   * Sets no requested resource found HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static NotFound(res: IResponse, message?: any) {
    res.status(404).send(message);
  }

  /**
   * Sets new resource created HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static Created(res: IResponse, message?: any) {
    res.status(201).send(message);
  }

  /**
   * Sets unauthenticated HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static Unauthorized(res: IResponse, message?: any) {
    res.status(401).send(message);
  }

  /**
   * Sets no access to resource HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static Forbidden(res: IResponse, message?: any) {
    res.status(403).send(message);
  }

  /**
   * Sets internal server error HTML status code
   * @param res - Response object from the server
   * @param message - Response message
   */
  static InternalServerError(res: IResponse, message?: any) {
    res.status(500).send(message);
  }
}

export default Response;
