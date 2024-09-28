import React, { PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard: React.FC<PropsWithChildren> = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={(e) => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);
