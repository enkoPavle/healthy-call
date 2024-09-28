import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SVGIcon } from "./svg_icon";
import { colors } from "@/constants/colors";
import { SVGIconNames } from "@/types/icons";

interface IProps {
  icon: SVGIconNames;
  iconColor?: string;
  title?: string;
  onPress?: () => void;
}

export const Option: React.FC<IProps> = ({
  icon,
  iconColor = colors.white,
  title = "",
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={styles.iconContainer}>
          <SVGIcon name={icon} color={iconColor} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    width: 63,
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 63,
    marginRight: 23,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
  },
});
