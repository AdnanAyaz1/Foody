// /app/api/dev/seed/route.ts (Next.js App Router example)
import Category from "@/database/category.model";
import Customization from "@/database/customization.model";
import Item from "@/database/item.model";
import dummyData from "@/libs/data";
import handleApiError from "@/libs/handlers/errors";
import { ApiResponse } from "@/libs/handlers/success";
import dbConnect from "@/libs/mongoose";

export async function POST() {
  try {
    await dbConnect();
    console.log("✅ Connected to MongoDB");

    await Promise.all([
      Category.deleteMany({}),
      Customization.deleteMany({}),
      Item.deleteMany({}),
    ]);

    // Insert categories and customizations
    const categories = await Category.insertMany(dummyData.categories);
    const customizations = await Customization.insertMany(
      dummyData.customizations
    );

    // Map IDs for relationships
    const categoryMap = new Map(categories.map((c) => [c.name, c._id]));
    const customizationMap = new Map(
      customizations.map((c) => [c.name, c._id])
    );

    // Prepare and insert items
    const items = dummyData.menu.map((item) => ({
      name: item.name,
      description: item.description,
      image: item.image_url,
      price: item.price,
      ratings: item.rating,
      category: categoryMap.get(item.category_name),
      customizations: item.customizations
        .map((n: string) => customizationMap.get(n))
        .filter(Boolean),
    }));

    await Item.insertMany(items);

    return ApiResponse("DATA INSERTED SUCCESSFULLY", 201);
  } catch (error) {
    console.error("Seeding failed:", error);
    return handleApiError(error, "api");
  }
}
