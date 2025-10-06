import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";

interface CustomInput<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

const CustomInputTest = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Enter value",
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInput<T>) => {
  return (
    <View>
      <Text>CustomInputTest</Text>
    </View>
  );
};

export default CustomInputTest;
