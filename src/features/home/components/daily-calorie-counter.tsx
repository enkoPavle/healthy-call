import { colors } from "@/constants/colors";
import { useTranslatedMeasures } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export const DailyCalorieCounter = () => {
  const { t } = useTranslation("home");
  const { combineMeasurement } = useTranslatedMeasures();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t("Today you have\nconsumed")}{" "}
        <Text style={styles.value}>{combineMeasurement(1552, "cal")}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  value: {
    color: colors.bright_turquoise,
  },
});
