import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ProgressCircle } from "./progress-circle";
import { ProgressValue } from "./progress-value";
import { useAnimatedValue } from "@/features/home/hooks/circular-progress";
import { colors } from "@/constants/colors";
import type { CircularProgressProps, ProgressRef } from "@/features/home/types";
import styles from "@/features/home/styles/circular-progress/circular-progress.styles";

export const CircularProgress = forwardRef<ProgressRef, CircularProgressProps>(
  (props, ref) => {
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
      title = "",
      titleStyle = {},
      titleColor,
      titleFontSize,
      progressValueColor,
      progressValueStyle = {},
      progressValueFontSize,
      valuePrefix = "",
      valueSuffix = "",
      showProgressValue = true,
      subtitle = "",
      subtitleStyle = {},
      subtitleColor,
      subtitleFontSize,
      progressFormatter = (v: number) => {
        "worklet";

        return Math.round(v);
      },
      allowFontScaling = true,
      valuePrefixStyle = {},
      valueSuffixStyle = {},
      strokeColorConfig = undefined,
    } = props;

    const {
      animatedCircleProps,
      animatedTextProps,
      progressValue,
      play,
      pause,
      reAnimate,
    } = useAnimatedValue({
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
      progressFormatter,
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
        progressValueColor,
        progressValueFontSize,
        progressValueStyle,
        activeStrokeColor,
        titleStyle,
        titleColor,
        titleFontSize,
        showProgressValue,
        subtitleColor,
        subtitleFontSize,
        subtitleStyle,
      }),
      [
        radius,
        rotation,
        progressValueColor,
        progressValueFontSize,
        progressValueStyle,
        activeStrokeColor,
        titleStyle,
        titleColor,
        titleFontSize,
        showProgressValue,
        subtitleColor,
        subtitleFontSize,
        subtitleStyle,
      ]
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
            // @ts-ignore
            animatedCircleProps={animatedCircleProps}
          />
        </View>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            styles(styleProps).valueContainer,
          ]}
        >
          {showProgressValue && (
            <View style={styles(styleProps).valueContainerRow}>
              {!!valuePrefix && (
                <Text
                  testID="progress-bar-value-prefix"
                  style={[
                    styles(styleProps).input,
                    progressValueStyle,
                    styles(styleProps).fromProps,
                    valuePrefixStyle,
                  ]}
                  allowFontScaling={allowFontScaling}
                >
                  {valuePrefix}
                </Text>
              )}
              <ProgressValue
                initialValue={initialValue}
                radius={radius}
                activeStrokeColor={activeStrokeColor}
                progressValueColor={progressValueColor}
                progressValueStyle={progressValueStyle}
                progressValueFontSize={progressValueFontSize}
                progressValue={progressValue}
                animatedTextProps={animatedTextProps}
                allowFontScaling={allowFontScaling}
              />
              {!!valueSuffix && (
                <Text
                  testID="progress-bar-value-suffix"
                  style={[
                    styles(styleProps).input,
                    progressValueStyle,
                    styles(styleProps).fromProps,
                    valueSuffixStyle,
                  ]}
                  allowFontScaling={allowFontScaling}
                >
                  {valueSuffix}
                </Text>
              )}
            </View>
          )}
          {title && title !== "" ? (
            <Text
              testID="progress-title-text"
              style={[styles(styleProps).title, titleStyle]}
              allowFontScaling={allowFontScaling}
            >
              {title}
            </Text>
          ) : null}
          {subtitle && subtitle !== "" ? (
            <Text
              testID="progress-subtitle-text"
              style={[
                styles(styleProps).title,
                styles(styleProps).subtitle,
                subtitleStyle,
              ]}
              numberOfLines={1}
              allowFontScaling={allowFontScaling}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
);
