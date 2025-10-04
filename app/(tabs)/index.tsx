import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";

import { globalStyles } from "@/styles";
import { scale, verticalScale } from "@/utils";

const Index = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[globalStyles.pb28, globalStyles.px5]}
        ListHeaderComponent={() => (
          <View style={[globalStyles.flexRowBetween, globalStyles.my5]}>
            <View>
              <Text style={globalStyles.smallBold}>DELIVER TO</Text>
              <TouchableOpacity
                style={[
                  globalStyles.flexRow,
                  globalStyles.flexCenter,
                  globalStyles.mt05,
                ]}
              >
                <Text style={globalStyles.paragraphBold}>Croatia</Text>
                <Image
                  source={images.arrowDown}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View
              style={[
                styles.offerCard,
                isEven ? styles.rowReverse : styles.row,
                { backgroundColor: item.color },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.offerImage}
                  resizeMode="contain"
                />
              </View>

              <View
                style={[
                  styles.offerInfo,
                  isEven ? styles.paddingLeft : styles.paddingRight,
                ]}
              >
                <Text className="text-white h1-bold">{item.title}</Text>
                <Image
                  source={images.arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  arrowIcon: {
    width: scale(12),
    height: scale(12),
    marginLeft: scale(4),
  },
  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: scale(20),
    marginVertical: verticalScale(10),
    height: verticalScale(160),
    overflow: "hidden",
  },
  row: { flexDirection: "row" },
  rowReverse: { flexDirection: "row-reverse" },
  imageContainer: { width: "50%", height: "100%" },
  offerImage: { width: "100%", height: "100%" },
  offerInfo: {
    width: "50%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  paddingRight: { paddingRight: scale(40) },
  paddingLeft: { paddingLeft: scale(40) },
  arrowRight: {
    width: scale(40),
    height: scale(40),
    tintColor: "#fff",
    marginTop: verticalScale(8),
  },
});
