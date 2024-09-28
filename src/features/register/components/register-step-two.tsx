import React from "react";
import { StyleSheet, View } from "react-native";
import { useRegisterContext } from "@/context";
import { ButtonWithIcon, Title } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

interface IProps {
  onSubmit: () => void;
}

export const RegisterStepTwo: React.FC<IProps> = ({ onSubmit }) => {
  const { userInfo, setUserProperty } = useRegisterContext();
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Title>{t("What’s your gender?")}</Title>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          title={t("Male")}
          icon="male"
          selected={userInfo.gender === "male"}
          onPress={() => {
            setUserProperty("gender", "male");
            onSubmit();
          }}
        />
        <ButtonWithIcon
          title={t("Female")}
          icon="female"
          selected={userInfo.gender === "female"}
          onPress={() => {
            setUserProperty("gender", "female");
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
