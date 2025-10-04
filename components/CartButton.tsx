import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 1;

  return (
    <TouchableOpacity className="cart-btn" onPress={() => router.push("/cart")}>
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="text-white small-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default CartButton;
