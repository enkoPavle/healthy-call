import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const ChatEmptyMessage = () => {
  const { t } = useTranslation("chat");

  return (
    <Text style={styles.text}>{t(`Write a message to start a dialog`)}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 24,
    color: colors.gray,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
