import seed from "@/libs/seed";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => seed().catch((error) => console.log("Error ", error))}
      >
        <Text>Seed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default search;
