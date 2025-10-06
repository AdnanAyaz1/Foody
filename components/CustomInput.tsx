import cn from "clsx";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import PasswordStrengthDropdown from "./PasswordStrengthDropDown";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  setIsPasswordValid?:()=>void,
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Enter value",
  setIsPasswordValid,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <View className="w-full">
            <Text className="mb-2 font-semibold text-gray-700">{label}</Text>

            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor="#888"
              className={cn(
                "border rounded-xl p-3 bg-gray-50 text-black",
                isFocused
                  ? "border-primary" // 🔹 active border color
                  : error
                    ? "border-red-500"
                    : "border-gray-300"
              )}
            />

            {error && (
              <Text className="mt-1 text-sm text-red-500">{error.message}</Text>
            )}
            {name === "password" && isFocused && (
              <PasswordStrengthDropdown password={value || ""}  />
            )}
          </View>
        );
      }}
    />
  );
};

export default CustomInput;
