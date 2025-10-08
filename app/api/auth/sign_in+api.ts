import User from "@/database/user.model";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import { RequestError } from "@/libs/http-errors";
import dbConnect from "@/libs/mongoose";
import { signInSchema } from "@/libs/schemas/signInSchema";
import { generateToken } from "@/libs/utils/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validatedData = signInSchema.parse(body);

    const user = await User.findOne({ email: validatedData.email }).select(
      "+password"
    );
    if (!user) {
      throw new RequestError(400, "Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(
      validatedData?.password,
      user.password
    );

    if (!isMatch) {
      throw new RequestError(401, "Invalid Credentials");
    }

    const token = generateToken(user._id.toString());

    return ApiResponse(
      "User created successfully",
      201,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      token
    );
  } catch (err) {
    return handleApiError(err, "api");
  }
}
