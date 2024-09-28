import React, { Children, ElementType, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";

interface IProps {
  ListEmptyComponent?: ElementType;
}

export const ItemList: React.FC<PropsWithChildren<IProps>> = ({
  children,
  ListEmptyComponent,
}) => {
  const count = Children.count(children);

  if (!children) {
    return ListEmptyComponent ? <ListEmptyComponent /> : null;
  }

  return (
    <View style={styles.container}>
      {Children.map(children, (child, index) => {
        const last = count === index + 1;
        return (
          <>
            {child}
            {!last && <View style={styles.separator} />}
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: colors.gray_dark,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_semi_dark,
    marginRight: -16,
  },
});
