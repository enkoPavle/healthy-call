import React from "react";
import { InfoText, SkipButton } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface IProps {
  onSkip: () => void;
}

export const RegisterFooter: React.FC<IProps> = ({ onSkip }) => {
  const { t } = useTranslation("auth");

  return (
    <View>
      <InfoText>
        {t(
          "We use this information to calculate and provide you with daily personalized recommendations"
        )}
      </InfoText>
      <SkipButton onPress={onSkip} />
    </View>
  );
};
