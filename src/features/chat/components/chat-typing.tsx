import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useInterval } from "@/shared/hooks";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

const length = 3;
const delay = 200;
const dots = Array.from({ length }, (_, index) => index + 1);

export const ChatTyping = () => {
  const [currentLength, setCurrentLength] = useState(3);
  const { t } = useTranslation("chat");

  useInterval(() => {
    if (currentLength < dots.length) {
      setCurrentLength((prev) => prev + 1);
    } else {
      setCurrentLength(0);
    }
  }, delay);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("typing")} </Text>
      {dots.map((item) => {
        const isActive = item === currentLength;
        const marginTop = isActive ? -0.9 : 0;

        return (
          <Text key={item} style={[styles.text, { marginTop }]}>
            .
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: colors.mine_shaft,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  text: {
    color: colors.white,
    marginLeft: -0.5,
  },
});
