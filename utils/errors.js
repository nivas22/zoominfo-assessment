const HttpStatus = require('http-status-codes');

class BadRequestError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.message = message;

    this.errorObject = errorObject || {
      status: 1,
      message,
    };
  }
}

class NotFoundError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
    this.message = message;
    this.errorObject = errorObject;
  }
}

class ForbiddenError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.FORBIDDEN;
    this.message = message;
    this.errorObject = errorObject;
  }
}

class NotAcceptableError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.NOT_ACCEPTABLE;
    this.message = message;
    this.errorObject = errorObject;
  }
}

class ServerError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.errorObject = errorObject;
  }
}

class UnauthorizedError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.UNAUTHORIZED;
    this.message = message;

    this.errorObject = errorObject || {
      status: 1,
      message,
    };
  }
}

class ConflictError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
    this.message = message;
    this.errorObject = errorObject;
  }
}

module.exports = {
  NotFoundError,
  ServerError,
  NotAcceptableError,
  ConflictError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError
}
