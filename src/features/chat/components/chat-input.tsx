import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ChatInputButton } from "./chat-input-button";
import { colors } from "@/constants/colors";

interface IMessage {
  text: string;
  isUser: boolean;
}

interface IProps {
  disabled?: boolean;
  onSend: (message: IMessage) => void;
}

export const ChatInput: React.FC<IProps> = ({ disabled = false, onSend }) => {
  const [value, setValue] = useState("");

  const onMessageSend = () => {
    onSend({
      text: value,
      isUser: true,
    });
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        style={styles.input}
        multiline={true}
      />
      <ChatInputButton
        iconName="arrowUp"
        onPress={onMessageSend}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.mine_shaft,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 8,
  },
  input: {
    maxHeight: 136,
    minHeight: 32,
    flexGrow: 1,
    flexShrink: 1,
    color: colors.white,
    lineHeight: 17,
    paddingLeft: 7,
    paddingRight: 15,
  },
  text: {
    color: colors.white,
  },
});
