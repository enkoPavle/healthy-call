import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ContainerAreaView, SubTitle, Title } from "@/shared/components/ui";

import { colors } from "@/constants/colors";

export const ConnectionError = () => {
  return (
    <ContainerAreaView>
      <View style={styles.container}>
        <Title style={styles.title}>Problem connecting</Title>
        <SubTitle style={styles.subtitle}>
          You’re offline. Check your connection
        </SubTitle>
        <Button title={"Retry"} variant="secondary" />
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
    color: colors.white,
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    color: colors.gray_light,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 30,
  },
});
