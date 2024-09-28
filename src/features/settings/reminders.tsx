import { router } from "expo-router";
import * as Linking from "expo-linking";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useRemindersContext } from "@/features/settings/context/reminders";
import {
  Button,
  ContainerAreaView,
  ItemList,
  ItemSwitch,
  Title,
} from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

const isIOS = Platform.OS === "ios";

export const RemindersScreen = () => {
  const { isReady, isPermissionsDenied, reminders, events, onReminderSwitch } =
    useRemindersContext();
  const { t } = useTranslation("reminders");

  if (isPermissionsDenied) {
    return (
      <ContainerAreaView>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Title style={styles.title}>
            {isIOS
              ? t("The app needs to access your calendar and reminders")
              : t("The app needs to access your calendar")}
          </Title>
          <Button title={t("Open settings")} onPress={Linking.openSettings} />
        </View>
      </ContainerAreaView>
    );
  } else if (!isReady) {
    return (
      <ContainerAreaView>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Title style={styles.title}>{t("Loading")}</Title>
        </View>
      </ContainerAreaView>
    );
  } else if (events.length || reminders.length) {
    const list = events.length ? events : reminders;

    return (
      <ContainerAreaView>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <ItemList>
            {list.map(({ id, title, startDate, isActive }) => (
              <ItemSwitch
                key={id}
                title={title}
                value={Boolean(isActive)}
                onPress={() =>
                  router.push({
                    pathname: `/settings/reminders/edit`,
                    params: {
                      id,
                      isActive: String(isActive),
                      title,
                      startDate,
                    },
                  })
                }
                onChange={() => {
                  onReminderSwitch({ id, isActive, title, startDate });
                }}
              />
            ))}
          </ItemList>
          <View style={styles.buttonsContainer}>
            <Button
              title={t("Create")}
              onPress={() => router.push("/settings/reminders/create")}
            />
          </View>
        </ScrollView>
      </ContainerAreaView>
    );
  } else {
    return (
      <ContainerAreaView>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Title style={styles.title}>{t("Your reminder list is empty")}</Title>
          <Button
            title={t("Create")}
            onPress={() => router.push("/settings/reminders/create")}
          />
        </View>
      </ContainerAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
  },
  title: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
