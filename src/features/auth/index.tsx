import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { SVGIcon, ContainerAreaView, Title } from "@/shared/components/ui";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
} from "expo-apple-authentication";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const Auth: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <ContainerAreaView>
      <View style={styles.container}>
        <View style={styles.circle}>
          <SVGIcon name="circle" width={250} height={250} />
        </View>
        <Title style={styles.title}>{t("Welcome back!")}</Title>
      </View>
      {Platform.select({
        ios: (
          <AppleAuthenticationButton
            buttonType={AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={10}
            style={styles.button}
            onPress={() => router.push("/(tabs)")}
          />
        ),
        android: (
          <GoogleSigninButton
            style={styles.button}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => router.push("/(tabs)")}
          />
        ),
      })}
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
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    width: "auto",
    height: 53,
    marginBottom: 30,
  },
});
