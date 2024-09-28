import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

interface IProps {
  disabled?: boolean;
  onPress: () => void;
}

export const SkipButton: React.FC<IProps> = ({ disabled, onPress }) => {
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={styles.title}>{t("Skip")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.bright_turquoise,
  },
});
