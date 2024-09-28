import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  variant?: "primary" | "secondary" | "dark_info" | "dark_danger";
  title?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<IProps> = ({
  variant = "primary",
  title = "",
  disabled,
  onPress,
}) => {
  const backgroundColor = {
    primary: colors.white,
    secondary: colors.green_accent,
    dark_info: colors.gray_dark,
    dark_danger: colors.gray_dark,
  }[variant];

  const titleColor = useMemo(() => {
    if (disabled) return colors.gray_light;
    else if (variant === "primary") return colors.black;
    else if (variant === "secondary") return colors.white;
    else if (variant === "dark_info") return colors.blue;
    else if (variant === "dark_danger") return colors.red;
  }, [variant, disabled]);

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={styles.touchable}
      >
        <Text
          style={{
            ...styles.title,
            color: titleColor,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});
