import Category from "@/database/category.model";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import dbConnect from "@/libs/mongoose";
import { ApiErrorResponse } from "@/types/types";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const categories = await Category.find();
    return ApiResponse("Categories Fetched", 200, categories);
  } catch (error) {
    return handleApiError(error, "api") as ApiErrorResponse;
  }
}
