import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export const BottomContainer: React.FC<IProps> = ({ style = {}, children }) => {
  return <View style={[style, styles.container]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 20,
  },
});
