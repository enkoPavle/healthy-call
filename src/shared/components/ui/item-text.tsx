import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  title: string;
  onPress?: () => void;
}

export const ItemText: React.FC<IProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!onPress}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: colors.white,
    fontSize: 17,
    paddingVertical: 11,
  },
});
