import { StyleSheet, View } from "react-native";
import { ItemList, ItemValue } from "@/shared/components/ui";
import { useTranslatedMeasures } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const GoalsScreen = () => {
  const { combineMeasurement } = useTranslatedMeasures();
  const { t } = useTranslation("goals");

  return (
    <View style={styles.container}>
      <ItemList>
        <ItemValue title={t("Goal")} value={t("Stay in shape")} />
        <ItemValue
          title={t("Daily intake")}
          value={combineMeasurement(2217, "cal")}
        />
        <ItemValue
          title={t("Target weight")}
          value={combineMeasurement(50, "kg")}
        />
        <ItemValue
          title={t("Drinking regimen")}
          value={combineMeasurement(2, "l")}
        />
      </ItemList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
