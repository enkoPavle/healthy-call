import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ProgressCircle } from "./progress-circle";
import { useAnimatedValue } from "@/features/home/hooks";
import type {
  CircularProgressBaseProps,
  ProgressRef,
} from "@/features/home/types";
import { colors } from "@/constants/colors";
import styles from "@/features/home/styles/circular-progress/circular-progress-base.styles";

export const CircularProgressBase = forwardRef<
  ProgressRef,
  CircularProgressBaseProps
>((props, ref) => {
  const {
    value,
    initialValue = 0,
    circleBackgroundColor = colors.transparent,
    radius = 60,
    duration = 500,
    delay = 0,
    maxValue = 100,
    strokeLinecap = "round",
    onAnimationComplete = () => null,
    activeStrokeColor = colors.green_accent,
    activeStrokeSecondaryColor = null,
    activeStrokeWidth = 10,
    inActiveStrokeColor = colors.black,
    inActiveStrokeWidth = 10,
    inActiveStrokeOpacity = 1,
    clockwise = true,
    startInPausedState = false,
    rotation = 0,
    strokeColorConfig = undefined,
    children,
  } = props;

  const { animatedCircleProps, play, pause, reAnimate } = useAnimatedValue({
    initialValue,
    radius,
    maxValue,
    clockwise,
    startInPausedState,
    delay,
    value,
    duration,
    onAnimationComplete,
    activeStrokeWidth,
    inActiveStrokeWidth,
    strokeColorConfig,
  });

  useImperativeHandle(ref, () => ({
    play,
    pause,
    reAnimate,
  }));

  const styleProps = useMemo(
    () => ({
      radius,
      rotation,
    }),
    [radius, rotation]
  );

  return (
    <View style={styles(styleProps).container} testID="progress-bar">
      <View style={styles(styleProps).rotatingContainer}>
        <ProgressCircle
          circleBackgroundColor={circleBackgroundColor}
          radius={radius}
          strokeLinecap={strokeLinecap}
          activeStrokeColor={activeStrokeColor}
          activeStrokeSecondaryColor={activeStrokeSecondaryColor}
          activeStrokeWidth={activeStrokeWidth}
          inActiveStrokeColor={inActiveStrokeColor}
          inActiveStrokeWidth={inActiveStrokeWidth}
          inActiveStrokeOpacity={inActiveStrokeOpacity}
          // @ts-ignorets-ignore
          animatedCircleProps={animatedCircleProps}
        />
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          styles(styleProps).valueContainer,
        ]}
      >
        {children}
      </View>
    </View>
  );
});
