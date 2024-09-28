import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "@/constants/colors";

export const ContainerAreaView: React.FC<ViewProps> = ({
  style,
  ...restProps
}) => {
  return <View style={[styles.container, style]} {...restProps} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.black,
  },
});
