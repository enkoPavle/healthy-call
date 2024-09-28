import { StyleSheet, View } from "react-native";
import { ItemList, ItemText, ItemValue } from "@/shared/components/ui";
import { useTranslatedMeasures } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

export const ProfileScreen = () => {
  const { combineMeasurement } = useTranslatedMeasures();
  const { t } = useTranslation("profile");

  return (
    <View style={styles.container}>
      <ItemList>
        <ItemText title={"Alis"} />
        <ItemText title={"alis.grandi@gmail.com"} />
      </ItemList>
      <ItemList>
        <ItemValue title={t("Gender")} value={t("Female")} />
        <ItemValue title={t("Age")} value={"18"} />
        <ItemValue title={t("Weight")} value={combineMeasurement("50", "kg")} />
        <ItemValue
          title={t("Height")}
          value={combineMeasurement("162", "cm")}
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
