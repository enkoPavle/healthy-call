import { Stack } from "expo-router";
import { RemindersProvider } from "@/features/settings/context/reminders";
import { BackButton } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

export default function RemindersLayout() {
  const { t } = useTranslation("reminders");

  return (
    <RemindersProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerLeft: () => <BackButton />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: t("Reminders"),
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            title: t("Add reminder"),
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: t("Edit reminder"),
          }}
        />
      </Stack>
    </RemindersProvider>
  );
}
