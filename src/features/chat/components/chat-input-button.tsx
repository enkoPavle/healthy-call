import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SVGIcon } from "@/shared/components/ui";
import { SVGIconNames } from "@/types/icons";
import { colors } from "@/constants/colors";

interface IProps {
  iconName: SVGIconNames;
  disabled: boolean;
  onPress: () => void;
}

export const ChatInputButton: React.FC<IProps> = ({
  iconName,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
      disabled={disabled}
      onPress={onPress}
    >
      <SVGIcon name={iconName} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bright_turquoise,
    paddingBottom: 2,
    borderRadius: 32,
    margin: 1,
    transform: [{ rotate: "90deg" }],
  },
});
