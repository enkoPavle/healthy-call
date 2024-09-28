import { Stack } from "expo-router";
import { BackButton } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
  const { t } = useTranslation("profile");

  return (
    <Stack
      screenOptions={{
        title: t("Profile"),
        headerTitleAlign: "center",
        headerLeft: () => <BackButton />,
      }}
    />
  );
}
