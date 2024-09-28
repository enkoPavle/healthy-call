import React from "react";
import { StyleSheet, View } from "react-native";
import { useRegisterContext } from "@/context";
import {
  BottomContainer,
  Button,
  ContainerAreaView,
  SubTitle,
  Title,
} from "@/shared/components/ui";
import { useTranslation } from "react-i18next";
import { IntroCircle } from "./components";

export const IntroStepThree = () => {
  const { register } = useRegisterContext();
  const { t } = useTranslation("auth");

  return (
    <ContainerAreaView>
      <View style={styles.container}>
        <IntroCircle />
        <Title style={styles.title}>{t("Well done, you did it!")}</Title>
        <SubTitle>{t("How about we create an account for you now?")}</SubTitle>
        <BottomContainer>
          <Button
            title={t("Let's go!")}
            variant="secondary"
            onPress={register}
          />
        </BottomContainer>
      </View>
    </ContainerAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
  },
});
