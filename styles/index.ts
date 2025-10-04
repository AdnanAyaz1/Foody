import { moderateScale, scale, verticalScale } from "@/utils";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // Layout helpers
  flexRow: { flexDirection: "row", alignItems: "center" },
  flexRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexCenter: { justifyContent: "center", alignItems: "center" },

  // Spacing
  px5: { paddingHorizontal: scale(20) },
  my5: { marginVertical: verticalScale(20) },
  mt05: { marginTop: verticalScale(2) },
  pb28: { paddingBottom: verticalScale(112) },

  // Text
  smallBold: {
    fontSize: moderateScale(12),
    fontWeight: "700",
    color: "#2A7DE1",
  },
  paragraphBold: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#222",
  },
  h1Bold: {
    fontSize: moderateScale(28),
    color: "#fff",
    fontFamily: "font-quicksand-bold",
  },
});
