// Description: Custom error class to handle errors in the application.
// The ExpressError class extends the Error class and takes two parameters: message and statusCode.
class ExpressError extends Error {
    constructor(message, statusCode) {
      super();
      this.message = message;
      this.statusCode = statusCode;
    }
  }
  
export default ExpressError;