import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, useWindowDimensions } from "react-native";
import { useRegisterContext } from "@/context";
import {
  RegisterStepOne,
  RegisterStepTwo,
  RegisterStepThree,
  RegisterStepFour,
  RegisterStepFive,
  RegisterStepSix,
  RegisterStepSeven,
  RegisterStepEight,
  RegisterFooter,
} from "@/features/register/components";
import { Button } from "@/shared/components/ui";
import { useKeyboardStatus } from "@/shared/hooks";

const formsList = [
  RegisterStepOne,
  RegisterStepTwo,
  RegisterStepThree,
  RegisterStepFour,
  RegisterStepFive,
  RegisterStepSix,
  RegisterStepSeven,
  RegisterStepEight,
];

const buttonsList = [RegisterFooter, Button];

export const useRegisterScreen = () => {
  const carouselContentRef = useRef<FlatList>(null);
  const carouselButtonsRef = useRef<FlatList>(null);
  const [step, setStep] = useState(1);

  const { userInfo } = useRegisterContext();
  const { isKeyboardVisible } = useKeyboardStatus();
  const { width } = useWindowDimensions();

  const onNextHandler = (count: number | undefined = 1) => {
    if (step < formsList.length) {
      if (carouselContentRef.current) {
        setStep(step + count);
        Keyboard.dismiss();
      }
    } else {
      router.push("/(auth)/intro/intro-step-three");
    }
  };

  const onBackHandler = (count: number | undefined = 1) => {
    if (step > 1) {
      if (carouselContentRef.current) {
        setStep(step - count);
        Keyboard.dismiss();
        Keyboard.dismiss();
      }
    } else {
      Keyboard.dismiss();
      router.back();
    }
  };

  useEffect(() => {
    if (carouselContentRef.current) {
      carouselContentRef.current.scrollToIndex({
        index: step - 1,
        animated: true,
      });
    }
  }, [step]);

  const onSubmit = () => {
    switch (step) {
      case 3:
        if (!userInfo.age) return;
        break;
      case 4:
        if (!userInfo.height) return;
        break;
      case 5:
        if (!userInfo.weight) return;
        break;
      case 6:
        if (!userInfo.desiredWeight) return;
        break;
      case 8:
        if (!userInfo.name) return;
        break;
      default:
        break;
    }
    onNextHandler();
  };

  const onSkip = () => {
    onNextHandler();
  };

  useEffect(() => {
    if (isKeyboardVisible) {
      carouselButtonsRef.current?.scrollToIndex({
        index: 1,
        animated: true,
      });
    } else {
      carouselButtonsRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }, [isKeyboardVisible]);

  return {
    carouselContentRef,
    carouselButtonsRef,
    step,
    width,
    formsList,
    buttonsList,
    onNextHandler,
    onBackHandler,
    onSubmit,
    onSkip,
  };
};
