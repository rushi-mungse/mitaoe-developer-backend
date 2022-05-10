class HandleCustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static handlingCustomError(statusCode, message) {
    return new HandleCustomError(statusCode, message);
  }
}

module.exports = HandleCustomError;
