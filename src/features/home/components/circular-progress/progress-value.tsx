import React, { useMemo, useRef } from "react";
import { TextInput, Platform } from "react-native";
import Animated, { useAnimatedReaction } from "react-native-reanimated";
import { colors } from "@/constants/colors";
import type { ProgressValueProps } from "../../types";
import styles from "../../styles/circular-progress/progress-value.styles";

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export const ProgressValue: React.FC<ProgressValueProps> = ({
  initialValue = 0,
  radius = 60,
  activeStrokeColor = colors.green_accent,
  progressValueColor,
  progressValueStyle = {},
  progressValueFontSize,
  progressValue,
  animatedTextProps,
  allowFontScaling = true,
}: ProgressValueProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  if (Platform.OS === "web") {
    // only run the reaction on web platform.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedReaction(
      () => {
        return progressValue.value;
      },
      (data, prevData) => {
        if (data !== prevData && inputRef.current) {
          inputRef.current.value = data;
        }
      }
    );
  }

  const styleProps = useMemo(
    () => ({
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    }),
    [
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    ]
  );

  return (
    <AnimatedInput
      testID="progress-value-text"
      ref={inputRef}
      underlineColorAndroid={colors.transparent}
      editable={false}
      defaultValue={`${initialValue}`}
      style={[
        styles(styleProps).input,
        progressValueStyle,
        styles(styleProps).fromProps,
      ]}
      animatedProps={animatedTextProps}
      allowFontScaling={allowFontScaling}
    />
  );
};
