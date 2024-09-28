import { SVGIcon } from "@/shared/components/ui";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export const IntroCircle = () => {
  const { width } = useWindowDimensions();
  const size = width ? width / 1.5 : 250;

  return (
    <View style={styles.container}>
      <SVGIcon name="circle" width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});
