import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const SearchBox = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: "/search",
      params: { query: "", category: "Pizzas" },
    });
  };

  return (
    <TouchableOpacity onPress={handleSearch}>
      <Text>Search</Text>
    </TouchableOpacity>
  );
};

export default SearchBox;
