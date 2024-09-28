import React from "react";
import { StyleSheet, View } from "react-native";
import { CircularProgressBase } from "./circular-progress-base";
import { CircularProgress } from "./circular-progress";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

interface IProps {
  food: number;
  water: number;
  activity: number;
}

const props = {
  activeStrokeWidth: 20,
  inActiveStrokeWidth: 20,
};

export const CircularProgressIndicator: React.FC<IProps> = ({
  food = 0,
  water = 0,
  activity = 0,
}) => {
  const { t } = useTranslation("home");
  const _food = Math.max(Math.min(food, 100), 0);
  const _water = Math.min(water, 100);
  const _activity = Math.min(activity, 100);

  const totalProgress = Math.floor((_food + _water + _activity) / 3);

  return (
    <View style={styles.container}>
      <CircularProgressBase
        {...props}
        value={_food}
        radius={140}
        activeStrokeColor={colors.bright_turquoise}
        inActiveStrokeColor={colors.mine_shaft}
      >
        <CircularProgressBase
          {...props}
          value={_activity}
          radius={90}
          activeStrokeColor={colors.pink}
          inActiveStrokeColor={colors.mine_shaft}
        >
          <CircularProgressBase
            {...props}
            value={_water}
            radius={115}
            activeStrokeColor={colors.havelock_blue}
            inActiveStrokeColor={colors.mine_shaft}
          >
            <CircularProgress
              {...props}
              value={totalProgress}
              radius={70}
              activeStrokeColor={colors.transparent}
              inActiveStrokeColor={colors.transparent}
              progressValueColor={colors.white}
              valueSuffix={"%"}
              progressValueStyle={{ fontSize: 24, fontWeight: "500" }}
              title={t("of daily goals")}
              titleFontSize={14}
              titleColor={colors.gray_light}
            />
          </CircularProgressBase>
        </CircularProgressBase>
      </CircularProgressBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 25,
  },
});
