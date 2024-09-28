import { ScrollView, StyleSheet } from "react-native";
import { DailyCalorieCounter, CircularProgressIndicator } from "./components";
import { ContainerAreaView, ProgressCard } from "@/shared/components/ui";

export const HomeScreen = () => {
  return (
    <ContainerAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <DailyCalorieCounter />
        <CircularProgressIndicator food={70} water={60} activity={50} />
        <ProgressCard type="food" goal={2217} result={1552} />
        <ProgressCard type="water" goal={2} result={1.2} />
        <ProgressCard type="activity" goal={1} result={0.5} />
      </ScrollView>
    </ContainerAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
  },
});
