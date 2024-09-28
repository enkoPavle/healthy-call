import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonWithIcon, Title } from "@/shared/components/ui";
import { useRegisterContext } from "@/context";
import { useTranslation } from "react-i18next";

interface IProps {
  onSubmit: () => void;
}

export const RegisterStepSeven: React.FC<IProps> = ({ onSubmit }) => {
  const { userInfo, setUserProperty } = useRegisterContext();
  const { t } = useTranslation("auth");

  return (
    <View style={styles.container}>
      <Title>{t("What’s your activity level?")}</Title>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          title={t("Sedentary")}
          subtitle={t("Little or no exercise")}
          icon="sleep"
          selected={userInfo.activityLevel === "sedentary"}
          iconHeight={30}
          onPress={() => {
            setUserProperty("activityLevel", "sedentary");
            onSubmit();
          }}
        />
        <ButtonWithIcon
          title={t("Active")}
          subtitle={t("Exercise 2-4 days/week")}
          icon="walk"
          selected={userInfo.activityLevel === "active"}
          iconHeight={30}
          onPress={() => {
            setUserProperty("activityLevel", "active");
            onSubmit();
          }}
        />
        <ButtonWithIcon
          title={t("Very active")}
          subtitle={t("Exercise 5-7 days/week")}
          icon="run"
          selected={userInfo.activityLevel === "veryActive"}
          iconHeight={30}
          onPress={() => {
            setUserProperty("activityLevel", "veryActive");
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
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
