export class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
