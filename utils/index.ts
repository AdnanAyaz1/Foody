import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Base dimensions (reference: iPhone 13 / 14 width 390, height 844)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

/**
 * Scale horizontally based on screen width
 * @param {number} size - base size (e.g. 16)
 * @returns {number}
 */
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * Scale vertically based on screen height
 * @param {number} size - base size (e.g. 16)
 * @returns {number}
 */
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

/**
 * Moderate scale (optional for text, paddings)
 * Keeps a smoother scaling instead of full proportional scaling
 * @param {number} size - base size
 * @param {number} factor - between 0 and 1 (default 0.5)
 */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Normalize font size to be consistent across pixel densities
 */
export const normalize = (size: number) => {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
