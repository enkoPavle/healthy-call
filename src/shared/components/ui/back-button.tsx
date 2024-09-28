import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SVGIcon } from "./svg_icon";

export const BackButton = () => (
  <TouchableOpacity onPress={router.back}>
    <SVGIcon name="arrowLeft" />
  </TouchableOpacity>
);
