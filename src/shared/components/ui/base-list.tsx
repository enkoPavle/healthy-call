import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

interface MenuItem {
  title: string;
  value?: string;
  flag?: boolean;
  onPress?: () => void;
  onChange?: () => void;
}

interface IProps {
  type?: "common" | "value" | "pressable" | "switch";
  data: MenuItem[];
}

export const BaseList: React.FC<IProps> = ({ type = "common", data }) => {
  const Separator = useCallback(() => <View style={styles.separator} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            disabled={type !== "pressable"}
            onPress={item.onPress}
          >
            <Text style={styles.item}>{item.title}</Text>
            {
              {
                common: null,
                value: (
                  <Text style={[styles.item, styles.value]}>{item.value}</Text>
                ),
                pressable: null,
                switch: (
                  <Switch
                    value={item.flag}
                    onTouchStart={item.onChange}
                    trackColor={{
                      false: colors.gray_semi_dark,
                      true: colors.bright_turquoise,
                    }}
                    thumbColor={colors.white}
                  />
                ),
              }[type]
            }
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  list: {
    backgroundColor: colors.gray_dark,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  item: {
    color: colors.white,
    fontSize: 17,
    paddingVertical: 11,
  },
  value: {
    color: colors.bright_turquoise,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_semi_dark,
  },
});
