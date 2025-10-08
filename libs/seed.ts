import Category from "@/database/category.model";
import Customization from "@/database/customization.model";
import Item from "@/database/item.model";
import dummyData from "./data";
import dbConnect from "./mongoose";
// 🔹 Connect to MongoDB

const seedDatabase = async () => {
  try {
    await dbConnect();

    // Optional: clear old data first
    await Promise.all([
      Category.deleteMany({}),
      Customization.deleteMany({}),
      Item.deleteMany({}),
    ]);
    console.log("🧹 Old data cleared");

    // 1️⃣ Insert categories
    const createdCategories = await Category.insertMany(dummyData.categories);
    const categoryMap = new Map(createdCategories.map((c) => [c.name, c._id]));
    console.log(`📦 Inserted ${createdCategories.length} categories`);

    // 2️⃣ Insert customizations
    const createdCustomizations = await Customization.insertMany(
      dummyData.customizations
    );
    const customizationMap = new Map(
      createdCustomizations.map((c) => [c.name, c._id])
    );
    console.log(`✨ Inserted ${createdCustomizations.length} customizations`);

    // 3️⃣ Insert items (menu)
    const itemsToInsert = dummyData.menu.map((item) => ({
      name: item.name,
      description: item.description,
      image: item.image_url,
      price: item.price,
      ratings: item.rating,
      category: categoryMap.get(item.category_name),
      customizations: item.customizations
        .map((name) => customizationMap.get(name))
        .filter(Boolean),
    }));

    await Item.insertMany(itemsToInsert);
    console.log(`🍔 Inserted ${itemsToInsert.length} items`);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
