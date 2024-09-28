import { Tabs } from "expo-router";
import { SVGIcon } from "@/shared/components/ui";
import { SVGIconNames } from "@/types/icons";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/colors";

function TabBarIcon(props: Readonly<{ name: SVGIconNames; color: string }>) {
  return <SVGIcon {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation("tabs");

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: t("Home"),
          headerTitleAlign: "left",
          headerTitle: t("Calorie table"),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={{
          title: t("Chat"),
          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => <TabBarIcon name="mail" color={color} />,
          tabBarBadge: t("Soon"),
          tabBarBadgeStyle: {
            backgroundColor: colors.mine_shaft,
            borderRadius: 2,
          },
        }}
      />
      <Tabs.Screen
        name="menu"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={{
          title: t("Menu"),
          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          tabBarBadge: t("Soon"),
          tabBarBadgeStyle: {
            backgroundColor: colors.mine_shaft,
            borderRadius: 2,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("Settings"),
          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
