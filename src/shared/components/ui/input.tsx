import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { colors } from "@/constants/colors";

export const Input: React.FC<TextInputProps> = ({ style, ...restProps }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.jumbo}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.gray_dark,
    color: colors.white,
    fontSize: 17,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
});
