import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";

export const MenuScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
