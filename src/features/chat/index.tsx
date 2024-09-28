import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
  } from "react-native";
  import { ContainerAreaView } from "@/shared/components/ui";
  import {
    ChatMessage,
    ChatInput,
    ChatEmptyMessage,
    ChatTyping,
  } from "./components";
  import { useChat } from "./hooks";
  import { colors } from "@/constants/colors";
  import { IPrediction } from "./types";
  
  export const ChatScreen = () => {
    const { flatListRef, predictions, onMessageSend } = useChat();
  
    return (
      <ContainerAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({
            ios: "padding",
            android: "height",
          })}
          enabled
          keyboardVerticalOffset={75}
        >
          <FlatList
            ref={flatListRef}
            data={predictions?.data}
            style={{ marginBottom: 10 }}
            inverted={true}
            contentContainerStyle={styles.messagesContainer}
            ListEmptyComponent={<ChatEmptyMessage />}
            renderItem={({ item }: { item: IPrediction }) => {
              return (
                <>
                  {item.output ? (
                    <ChatMessage
                      key={item.id + "output"}
                      text={item.output}
                      isUser={false}
                    />
                  ) : (
                    <ChatTyping />
                  )}
                  <ChatMessage
                    key={item.id + "input"}
                    text={item.input}
                    isUser={true}
                  />
                </>
              );
            }}
          />
          <ChatInput onSend={onMessageSend} />
        </KeyboardAvoidingView>
      </ContainerAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingBottom: 10,
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    emptyMessage: {
      flex: 1,
      fontSize: 24,
      color: colors.gray,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
  