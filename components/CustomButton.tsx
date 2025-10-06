import { CustomButtonProps } from "@/types/types";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-xl p-4",
        disabled || isLoading ? "bg-gray-400 opacity-60" : "bg-primary",
        style
      )}
    >
      {leftIcon}

      <View className="flex-row items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={cn(
              "text-white quicksand-semibold text-base",
              textStyle,
              (disabled || isLoading) && "text-gray-200"
            )}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
