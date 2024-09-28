import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<IProps> = ({ text, isUser }) => {
  return (
    <View
      style={[
        styles.container,
        { alignItems: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textContainer: {
    maxWidth: "75%",
    width: "auto",
    backgroundColor: colors.mine_shaft,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  text: {
    color: colors.white,
  },
});
