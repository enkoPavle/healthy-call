import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ContainerAreaView, SubTitle, Title } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";
import { IntroCircle } from "./components";

export const IntroStepOne: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <ContainerAreaView>
      <View style={styles.container}>
        <IntroCircle />
        <Title style={styles.title}>{t("Hi, I'm Emmy!")}</Title>
        <SubTitle>{t("I'm going to help you explore\nour app)")}</SubTitle>
      </View>
      <Button
        title={t("Got it!")}
        variant="secondary"
        onPress={() => router.push("/(auth)/intro/intro-step-two")}
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
  title: {
    marginBottom: 10,
  },
});
