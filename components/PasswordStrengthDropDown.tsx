import { CheckCircle, Circle } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface PasswordStrengthDropdownProps {
  password: string;
}

const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  {
    label: "At least one uppercase letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    label: "At least one lowercase letter",
    test: (p: string) => /[a-z]/.test(p),
  },
  { label: "At least one number", test: (p: string) => /[0-9]/.test(p) },
  {
    label: "At least one special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

const PasswordStrengthDropdown = ({
  password,
}: PasswordStrengthDropdownProps) => {
  return (
    <View className="p-3 mt-2 bg-white border-[0.5px] border-gray-200 shadow-sm rounded-xl">
      {rules.map((rule, index) => {
        const passed = rule.test(password);
        return (
          <View key={index} className="flex-row items-center gap-2 mb-1">
            {passed ? (
              <CheckCircle size={16} color="#10B981" /> // green check
            ) : (
              <Circle size={16} color="#9CA3AF" /> // gray circle
            )}
            <Text
              className={`text-sm ${
                passed ? "text-green-600" : "text-gray-500"
              }`}
            >
              {rule.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PasswordStrengthDropdown;
