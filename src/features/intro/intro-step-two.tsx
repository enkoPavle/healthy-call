import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ContainerAreaView, SubTitle } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";
import { IntroCircle } from "./components";

export const IntroStepTwo: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <ContainerAreaView>
      <View style={styles.container}>
        <IntroCircle />
        <SubTitle>
          {t("Let's start by calculating your calorie allowance for the day")}
        </SubTitle>
      </View>
      <Button
        title={t("Let's go!")}
        variant="secondary"
        onPress={() => router.push("/(auth)/register/")}
      />
      <Button
        title={t("I'll do it later")}
        variant="primary"
        onPress={() => router.push("/(auth)/intro/intro-step-three")}
      />
    </ContainerAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    marginBottom: 30,
  },
});
