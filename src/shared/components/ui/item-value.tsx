import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  title: string;
  value: string;
}

export const ItemValue: React.FC<IProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontSize: 17,
  },
  valueContainer: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 16,
  },
  value: {
    color: colors.bright_turquoise,
    textAlign: "right",
  },
});
