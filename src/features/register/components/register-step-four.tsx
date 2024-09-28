import React, { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useRegisterContext } from "@/context";
import { Title } from "@/shared/components/ui";
import { useTranslatedMeasures } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const RegisterStepFour: React.FC = () => {
  const inputRef = useRef<TextInput>(null);
  const { userInfo, setUserProperty } = useRegisterContext();
  const { cm } = useTranslatedMeasures();
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Title>{t("What’s your height?")}</Title>
      <View style={styles.inputContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            inputRef.current?.focus();
          }}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              maxLength={3}
              onChangeText={(value) => {
                setUserProperty("height", value);
              }}
              keyboardType="decimal-pad"
              placeholder={t("Tap")}
              caretHidden={true}
              placeholderTextColor={colors.mine_shaft}
              value={userInfo.height?.toString()}
            />
            <Text style={styles.input}>{userInfo.height ? cm : ""}</Text>
          </View>
        </TouchableWithoutFeedback>
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
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    fontSize: 40,
    fontWeight: "500",
    color: colors.white,
  },
});
