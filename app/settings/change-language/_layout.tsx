import { Stack } from "expo-router";
import { BackButton } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

export default function ChangeLanguageLayout() {
  const { t } = useTranslation("change-language");

  return (
    <Stack
      screenOptions={{
        title: t("Language"),
        headerTitleAlign: "center",
        headerLeft: () => <BackButton />,
      }}
    />
  );
}
