import Category from "@/database/category.model";
import Item from "@/database/item.model";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import { RequestError } from "@/libs/http-errors";
import dbConnect from "@/libs/mongoose";
import { ApiErrorResponse } from "@/types/types";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const categoryName = searchParams.get("category");
    const filter: any = {};

    if (query) {
      filter.name = { $regex: query, $options: "i" };
    }

    if (categoryName) {
      const categoryDoc = await Category.findOne({ name: categoryName });

      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        throw new RequestError(400, "No items found for given category");
      }
    }
    const items = await Item.find(filter).populate("category");
    return ApiResponse("Items fetched successfully", 200, items);
  } catch (error) {
    return handleApiError(error, "api") as ApiErrorResponse;
  }
}
