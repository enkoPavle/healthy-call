import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import {
  Button,
  ContainerAreaView,
  ItemList,
  ItemText,
} from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

export const SettingsScreen = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { t } = useTranslation("settings");

  const toggleDeleteConfirmaton = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  const handleLogOut = () => {
    router.replace("/auth/");
  };

  return (
    <ContainerAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          <ItemList>
            <ItemText
              title={t("Profile")}
              onPress={() => router.push("/settings/profile/")}
            />
            <ItemText
              title={t("Goals")}
              onPress={() => router.push("/settings/goals/")}
            />
            <ItemText
              title={t("Reminders")}
              onPress={() => router.push("/settings/reminders/")}
            />
            <ItemText title={t("Regular activity")} />
          </ItemList>
          <ItemList>
            <ItemText
              title={t("Change language")}
              onPress={() => router.push("/settings/change-language/")}
            />
            <ItemText title={t("Support")} />
          </ItemList>
        </View>
        <View style={styles.buttonsContainer}>
          {deleteConfirmation ? (
            <>
              <Button
                variant="dark_danger"
                title={t("Delete my account")}
                onPress={() => {}}
              />
              <Button
                variant="dark_info"
                title={t("Cancel")}
                onPress={toggleDeleteConfirmaton}
              />
            </>
          ) : (
            <>
              <Button
                variant="dark_danger"
                title={t("Log out")}
                onPress={handleLogOut}
              />
              <Button
                variant="dark_danger"
                title={t("Delete account")}
                onPress={toggleDeleteConfirmaton}
              />
            </>
          )}
        </View>
      </ScrollView>
    </ContainerAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  listContainer: {
    paddingTop: 20,
  },
  buttonsContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
