import type React from "react";
import type { TextInputProps, TextStyle } from "react-native";
import type { AnimateProps } from "react-native-reanimated";
import type Animated from "react-native-reanimated";
import type { CircleProps } from "react-native-svg";

type StrokeLineCapType = "butt" | "round" | "square";

interface DashedCircleProps {
  circleCircumference: number;
  inActiveStrokeWidth: number;
  activeStrokeWidth: number;
  inactiveCircleRadius: number;
  activeCircleRadius: number;
}

type StrokeColorConfigType = {
  value: number;
  color: string;
};

interface BaseProgressCircleProps {
  activeStrokeColor?: string;
  activeStrokeSecondaryColor?: string | null;
  circleBackgroundColor?: string;
  radius?: number;
  strokeLinecap?: StrokeLineCapType;
  inActiveStrokeColor?: string;
  inActiveStrokeOpacity?: number;
  activeStrokeWidth?: number;
  inActiveStrokeWidth?: number;
  strokeColorConfig?: StrokeColorConfigType[];
}

interface ProgressCircleProps extends BaseProgressCircleProps {
  animatedCircleProps: AnimateProps<CircleProps>;
}

interface BaseCircularProgressProps extends BaseProgressCircleProps {
  value: number;
  initialValue?: number;
  duration?: number;
  delay?: number;
  maxValue?: number;
  onAnimationComplete?: () => void;
  clockwise?: boolean;
  startInPausedState?: boolean;
  rotation?: number;
}

interface CircularProgressBaseProps extends BaseCircularProgressProps {
  children?: React.ReactNode;
}

interface CircularProgressProps extends BaseCircularProgressProps {
  title?: string;
  titleStyle?: TextStyle;
  titleColor?: string;
  titleFontSize?: number;
  progressValueColor?: string;
  progressValueStyle?: TextStyle;
  progressValueFontSize?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  showProgressValue?: boolean;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  subtitleColor?: string;
  subtitleFontSize?: number;
  // eslint-disable-next-line no-unused-vars
  progressFormatter?: (v: number) => number | string;
  allowFontScaling?: boolean;
  valuePrefixStyle?: TextStyle;
  valueSuffixStyle?: TextStyle;
}

type ProgressValueProps = {
  initialValue: number;
  radius?: number;
  activeStrokeColor?: string;
  progressValueColor?: string;
  progressValueStyle?: TextStyle;
  progressValueFontSize?: number;
  progressValue: Animated.SharedValue<string>;
  animatedTextProps: AnimateProps<TextInputProps>;
  allowFontScaling?: boolean;
};

type ProgressRef = {
  play: () => void;
  pause: () => void;
  reAnimate: () => void;
};

export type {
  ProgressCircleProps,
  CircularProgressBaseProps,
  CircularProgressProps,
  DashedCircleProps,
  ProgressValueProps,
  StrokeColorConfigType,
  ProgressRef,
};
