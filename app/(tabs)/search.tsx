import CartButton from "@/components/CartButton";
import CategoriesList from "@/components/CategoriesList";
import MenuCard from "@/components/MenuCard";
import Searchbar from "@/components/SearchBar";
import { useFetch } from "@/libs/fetch";
import { category, Item } from "@/types/types";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const params = useLocalSearchParams();
  const query = params.query as string | undefined;
  const category = params.category as string | undefined;

  const endpoint = `/api/items/get?${new URLSearchParams({
    ...(query ? { query } : {}),
    ...(category ? { category } : {}),
  }).toString()}`;

  const { data, loading, error, refetch } = useFetch<Item[]>(endpoint, "GET");
  const {
    data: categories,
    loading: loading_categories,
    error: error_categories,
  } = useFetch<category[]>("/api/categories/get", "GET");

  const [isRefetching, setIsRefetching] = useState(false);

  // 🔄 Re-fetch when query or category changes
  useEffect(() => {
    const doRefetch = async () => {
      setIsRefetching(true);
      await refetch();
      setIsRefetching(false);
    };
    doRefetch();
  }, [query, category, refetch]);

  // 🧭 Full-screen loader only for the very first load
  if (loading && !data)
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text className="text-red-500">Failed to load data</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={isRefetching ? [] : data || []} // hide items when refetching
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as Item} />
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="gap-5 my-5">
            {/* 🔹 Header (always visible) */}
            <View className="flex-row justify-between w-full">
              <View>
                <Text className="uppercase small-bold text-primary">
                  Search
                </Text>
                <Text className="mt-1 paragraph-semibold text-dark-100">
                  Find your favorite food
                </Text>
              </View>
              <CartButton />
            </View>

            <Searchbar />
            <CategoriesList
              categories={categories}
              isLoading={loading_categories}
              error={error_categories}
            />

            {/* Inline loader — only for refetching */}
            {isRefetching && (
              <View className="flex items-center justify-center mt-5">
                <ActivityIndicator size="small" />
                <Text className="mt-2 text-gray-500">Updating results...</Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          !isRefetching ? (
            <Text className="mt-10 text-center text-gray-500">
              No items found.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Search;
