import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  title: string;
  value: boolean;
  onPress?: () => void;
  onChange?: () => void;
}

export const ItemSwitch: React.FC<IProps> = ({
  title,
  value,
  onPress,
  onChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={onPress ? undefined : 1}
      onPress={onPress}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onTouchStart={onChange}
          trackColor={{
            false: colors.gray_semi_dark,
            true: colors.bright_turquoise,
          }}
          thumbColor={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 17,
    paddingVertical: 11,
  },
  switchContainer: {
    justifyContent: "center",
    paddingLeft: 16,
  },
});
