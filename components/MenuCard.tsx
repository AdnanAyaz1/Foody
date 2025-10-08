import { useCartStore } from "@/store/cart.store";
import { Item } from "@/types/types";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: Item }) => {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: item.image }}
        className="absolute size-32 -top-10"
        resizeMode="contain"
      />
      <Text
        className="mb-2 text-center base-bold text-dark-100"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="mb-4 text-gray-200 body-regular">
        From ${item.price}
      </Text>
      <TouchableOpacity
        onPress={() =>
          addItem({
            id: item._id,
            name: item.name,
            price: item.price,
            image_url: item.image,
            customizations: [],
          })
        }
      >
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
