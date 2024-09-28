import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { colors } from "@/constants/colors";
import { SVGIcon } from "./svg_icon";
import { SVGIconNames } from "@/types/icons";

interface IProps {
  variant?: "primary" | "secondary" | "dark_info" | "dark_danger";
  title?: string;
  subtitle?: string;
  icon: SVGIconNames;
  iconWidth?: number;
  iconHeight?: number;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const ButtonWithIcon: React.FC<IProps> = ({
  variant = "primary",
  title = "",
  subtitle = "",
  icon,
  iconWidth = 24,
  iconHeight = 24,
  selected,
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
    <View
      style={{
        ...styles.container,
        backgroundColor: selected ? colors.bright_turquoise : backgroundColor,
      }}
    >
      <TouchableHighlight
        style={styles.touchable}
        underlayColor={colors.bright_turquoise}
        onPress={onPress}
        disabled={disabled}
      >
        <>
          <View style={styles.iconContainer}>
            <SVGIcon name={icon} width={iconWidth} height={iconHeight} />
          </View>
          <View>
            <Text
              style={{
                ...styles.title,
                color: titleColor,
              }}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                style={{
                  ...styles.subtitle,
                  color: titleColor,
                }}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </>
      </TouchableHighlight>
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
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 63,
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 63,
    marginRight: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.mine_shaft,
  },
});
