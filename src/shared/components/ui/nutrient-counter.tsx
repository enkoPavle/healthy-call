import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { TNutrient } from "@/types/common";

interface IProps {
  type: TNutrient;
  result: number;
}

const data = {
  proteins: {
    title: "Proteins",
    color: colors.green_accent,
  },
  fats: {
    title: "Fats",
    color: colors.havelock_blue,
  },
  carbohydrates: {
    title: "Carbohydrates",
    color: colors.pink,
  },
};

export const NutrientCounter: React.FC<IProps> = ({ type, result = 0 }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: data[type].color }}>
      <Text style={styles.title}>{data[type].title}</Text>
      <Text style={styles.result}>{`${result}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.white,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  result: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray_light,
  },
});
