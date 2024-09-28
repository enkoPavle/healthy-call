import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";
import DatePicker from "react-native-date-picker";

interface IProps {
  value: Date;
  onChange: (date: any) => void;
}

const isIOS = Platform.OS === "ios";

export const ItemTimePicker: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <DatePicker
        theme="dark"
        date={value}
        mode="time"
        fadeToColor={colors.gray_dark}
        onDateChange={(date) => {
          onChange(date);
        }}
        style={{ flex: 1 }}
        textColor={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: isIOS ? 0 : 10,
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
