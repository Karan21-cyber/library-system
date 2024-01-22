class HttpException extends Error {
  public message: string;
  public statusCode: number;

  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {string} message - the message for the instance
   * @param {number} statusCode - the status code for the instance
   * @return {void}
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpException;
