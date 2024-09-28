import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Title } from "@/shared/components/ui";
import { useRegisterContext } from "@/context";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const RegisterStepEight: React.FC = () => {
  const { userInfo, setUserProperty } = useRegisterContext();
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Title>{t("What’s your name?")}</Title>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={32}
          onChangeText={(value) => setUserProperty("name", value)}
          textAlign="center"
          keyboardType="default"
          placeholder={t("Tap")}
          caretHidden={true}
          placeholderTextColor={colors.mine_shaft}
          value={userInfo.name?.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "500",
    color: colors.white,
  },
});
