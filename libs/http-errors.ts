export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;
  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Request Error";
    this.errors = errors;
  }
}

export class ValidationError extends RequestError {
  constructor(FieldErrors: Record<string, string[]>) {
    super(400, ValidationError.FormatFieldError(FieldErrors));
  }
  static FormatFieldError(FieldErrors: Record<string, string[]>): string {
    const formattedMessages = Object.entries(FieldErrors).map(
      // .entries method returns an array of key value pairs in this case the feild and error message 
      ([field, messages]) => {
        if (messages[0] === "Required") {
          return `${field} is Required.`;
        } else {
          return messages.join("and");
        }
      }
    );
    return formattedMessages.join(",");
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string = "Not Found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
