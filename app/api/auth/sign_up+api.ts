import User from "@/database/user.model";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import { ForbiddenError } from "@/libs/http-errors";
import dbConnect from "@/libs/mongoose";
import { signUpSchema } from "@/libs/schemas/signUpSchema";
import { generateToken } from "@/libs/utils/jwt";
import { ApiErrorResponse } from "@/types/types";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = signUpSchema.parse(body);

    const existingAccount = await User.findOne({
      email: validatedData.email,
    });

    if (existingAccount)
      throw new ForbiddenError("An account with this email already exists");

    const newUser = await User.create(validatedData);

    const token = generateToken(newUser._id.toString());
    newUser.token = token;
    newUser.save();

    return ApiResponse(
      "User created successfully",
      201,
      {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      token
    );
  } catch (error) {
    return handleApiError(error, "api") as ApiErrorResponse;
  }
}
