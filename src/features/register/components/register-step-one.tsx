import React from "react";
import { StyleSheet, View } from "react-native";
import { useRegisterContext } from "@/context";
import { ButtonWithIcon, Title } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

interface IProps {
  onSubmit: () => void;
}

export const RegisterStepOne: React.FC<IProps> = ({ onSubmit }) => {
  const { userInfo, setUserProperty } = useRegisterContext();
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Title>{t("What goal do you have\nin mind?")}</Title>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          title={t("Lose weight")}
          icon="arrowDecline"
          selected={userInfo.goal === "lose"}
          onPress={() => {
            setUserProperty("goal", "lose");
            onSubmit();
          }}
        />
        <ButtonWithIcon
          title={t("Maintain weight")}
          icon="arrowMaintain"
          selected={userInfo.goal === "maintain"}
          onPress={() => {
            setUserProperty("goal", "maintain");
            onSubmit();
          }}
        />
        <ButtonWithIcon
          title={t("Gain weight")}
          icon="arrowGrowth"
          selected={userInfo.goal === "gain"}
          onPress={() => {
            setUserProperty("goal", "gain");
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
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
