import React, { useMemo } from "react";
import { useCircleValues } from "../../hooks/circular-progress/use-circle-values";
import Svg, { G, Circle } from "react-native-svg";
import Animated from "react-native-reanimated";
import { colors } from "@/constants/colors";
import type { ProgressCircleProps } from "../../types";
import styles from "../../styles/circular-progress/progress-circle.styles";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  circleBackgroundColor = colors.transparent,
  radius = 60,
  strokeLinecap = "round",
  activeStrokeColor = colors.green_accent,
  activeStrokeSecondaryColor = null,
  activeStrokeWidth = 10,
  inActiveStrokeColor = colors.black,
  inActiveStrokeWidth = 10,
  inActiveStrokeOpacity = 1,
  animatedCircleProps,
}: ProgressCircleProps) => {
  const viewBox = useMemo(
    () => radius + Math.max(activeStrokeWidth, inActiveStrokeWidth),
    [radius, activeStrokeWidth, inActiveStrokeWidth]
  );
  const { inactiveCircleRadius, activeCircleRadius, circleCircumference } =
    useCircleValues({
      radius,
      activeStrokeWidth,
      inActiveStrokeWidth,
    });

  const strokeColor = useMemo(
    () => (activeStrokeSecondaryColor ? "url(#grad)" : activeStrokeColor),
    [activeStrokeSecondaryColor, activeStrokeColor]
  );

  return (
    <Svg
      testID="progress-circle"
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${viewBox * 2} ${viewBox * 2}`}
      style={styles.svg}
    >
      <G>
        <Circle
          cx="50%"
          cy="50%"
          stroke={inActiveStrokeColor}
          strokeWidth={inActiveStrokeWidth}
          r={inactiveCircleRadius}
          fill={circleBackgroundColor}
          strokeOpacity={inActiveStrokeOpacity}
        />
        <AnimatedCircle
          cx="50%"
          cy="50%"
          stroke={strokeColor}
          strokeWidth={activeStrokeWidth}
          r={activeCircleRadius}
          fill={colors.transparent}
          strokeDasharray={circleCircumference}
          strokeLinecap={strokeLinecap}
          animatedProps={animatedCircleProps}
        />
      </G>
    </Svg>
  );
};
