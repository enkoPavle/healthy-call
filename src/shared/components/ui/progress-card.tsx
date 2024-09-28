import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { TMeasures, TProgressType } from "@/types/common";
import { useTranslation } from "react-i18next";
import { useTranslatedMeasures } from "@/shared/hooks";

interface IProps {
  type: TProgressType;
  goal: number;
  result: number;
}

type IData = Record<
  TProgressType,
  {
    title: string;
    unit: TMeasures;
    color: string;
  }
>;

const data: IData = {
  food: {
    title: "Food",
    unit: "cal/day",
    color: colors.green_accent,
  },
  water: {
    title: "Water",
    unit: "l",
    color: colors.havelock_blue,
  },
  activity: {
    title: "Activity",
    unit: "workout",
    color: colors.pink,
  },
};

export const ProgressCard: React.FC<IProps> = ({
  type,
  goal = 0,
  result = 0,
}) => {
  const { t } = useTranslation("home");
  const { combineMeasurement } = useTranslatedMeasures();
  const progress = Math.floor((result / goal) * 100);
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={{ ...styles.container, borderColor: data[type].color }}>
      <Text style={styles.title}>{t(data[type].title)}</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.result}>
          {combineMeasurement(goal, data[type].unit)}
        </Text>
        <Text style={styles.result}>{`${progressPercentage}% ${t(
          "complete"
        )}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 18,
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
