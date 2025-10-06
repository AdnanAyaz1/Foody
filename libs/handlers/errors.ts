import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };
  return responseType === "api"
    ? new Response(JSON.stringify(responseContent), { status: status })
    : { status, ...responseContent };
};

const handleApiError = (
  error: unknown,
  responseType: ResponseType = "server"
) => {
  if (error instanceof RequestError) {
    return formatResponse("api", error.statusCode, error.message, error.errors);
  }
  console.log("Inside API ERROR", error);
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]> // .flatten is a method rpovided by zod that returns two arrays form errors and field errors
    );
    return formatResponse(
      "api",
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    let message = error.message || "An unexpected error occurred";
    let status = 500;
    if (error?.name === "CastError") {
      let id = error.message.split(" ")[6];
      id = id.replace(/[^a-zA-Z0-9]/g, "");
      message = `THE ID : ${id} is not valid`;
      status = 409; // bad request Conflict
    }
    if ((error as any).code === 11000) {
      const duplicateKey = Object.keys((error as any).keyValue).join(", ");
      message = `${duplicateKey} already exists. Please use a different value.`;
      status = 409; // Conflict
    }
    return formatResponse("api", status, message);
  }

  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleApiError;
