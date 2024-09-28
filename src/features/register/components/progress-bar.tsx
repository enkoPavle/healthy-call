import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SVGIcon } from "@/shared/components/ui/svg_icon";
import { colors } from "@/constants/colors";

interface IProps {
  length: number;
  current: number;
  onBack: () => void;
}

export const ProgressBar: React.FC<IProps> = ({ length, current, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <SVGIcon name="arrowLeft" width={24} height={24} />
      </TouchableOpacity>
      {Array.from(Array(length).keys()).map((el) => (
        <View
          key={el}
          style={{
            ...styles.block,
            backgroundColor:
              colors[el < current ? "bright_turquoise" : "gray_light"],
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  button: {
    marginRight: 10,
  },
  block: {
    flexGrow: 1,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 6,
  },
});
