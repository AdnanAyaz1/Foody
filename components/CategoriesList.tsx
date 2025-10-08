import { category } from "@/types/types";
import cn from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoriesList = ({
  categories,
  isLoading,
  error,
}: {
  categories: category[] | null;
  isLoading: boolean;
  error: any;
}) => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const activeCategory = (searchParams.category as string) || "All";
  const [active, setActive] = useState(activeCategory);

  useEffect(() => {
    setActive(activeCategory);
  }, [activeCategory]);

  const handlePress = (catName: string) => {
    setActive(catName);

    if (catName === "All") {
      // 🚫 remove category filter
      router.setParams({ category: undefined });
    } else {
      // ✅ set new category
      router.setParams({ category: catName });
    }
  };

  if (isLoading) return <ActivityIndicator size="small" />;
  if (error)
    return (
      <Text className="text-red-500">
        Failed to load categories: {String(error)}
      </Text>
    );

  // prepend an "All" option
  const allCategories = [{ _id: "all", name: "All" }, ...(categories || [])];

  return (
    <View>
      <FlatList
        data={allCategories}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-2 pb-3"
        renderItem={({ item }) => {
          const isActive = active === item.name;
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => handlePress(item.name)}
              className={cn(
                "px-4 py-2 rounded-full shadow-md min-w-16 flex flex-row items-center justify-center",
                isActive
                  ? "bg-amber-500 border-amber-500"
                  : "bg-white border-gray-200"
              )}
              style={
                Platform.OS === "android"
                  ? { elevation: isActive ? 5 : 2, shadowColor: "#878787" }
                  : {}
              }
            >
              <Text
                className={cn(
                  "body-medium",
                  isActive ? "text-white" : "text-gray-700"
                )}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoriesList;
