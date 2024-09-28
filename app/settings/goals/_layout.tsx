import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { BackButton } from "@/shared/components/ui";

export default function GoalsLayout() {
  const { t } = useTranslation("goals");

  return (
    <Stack
      screenOptions={{
        title: t("Goals"),
        headerTitleAlign: "center",
        headerLeft: () => <BackButton />,
      }}
    />
  );
}
