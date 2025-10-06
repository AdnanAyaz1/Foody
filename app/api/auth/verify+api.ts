import User from "@/database/user.model";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import { NotFoundError, RequestError } from "@/libs/http-errors";
import dbConnect from "@/libs/mongoose";
import jwt from "jsonwebtoken";

export async function verifyUser(req: Request) {
  try {
    // 1️⃣ Extract token from header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new RequestError(400, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    // 3️⃣ Reconnect and find user
    await dbConnect();
    const user = await User.findById(decoded.id)
    if (!user) return new NotFoundError("User Not Found");

    return ApiResponse("Token Verified", 200, user, token);
  } catch (error) {
    return handleApiError(error, "api");
  }
}
