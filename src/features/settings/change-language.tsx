import { StyleSheet, View } from "react-native";
import { ItemList, ItemText } from "@/shared/components/ui";
import { setLanguage } from "@/store/features/i18n.slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";
import { TAppLanguages } from "@/util/i18n";

export const ChangeLanguageScreen = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const onLanguageChangeHandler = async (language: TAppLanguages) => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
  };

  return (
    <View style={styles.container}>
      <ItemList>
        <ItemText
          title={"English"}
          onPress={() => onLanguageChangeHandler("en")}
        />
        <ItemText
          title={"Українська"}
          onPress={() => onLanguageChangeHandler("uk")}
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
