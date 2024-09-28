import { Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type TextProps = Text["props"];

export const InfoText = (props: TextProps) => {
  const { style, ...otherProps } = props;

  return <Text style={[styles.text, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray,
    textAlign: "center",
  },
});
