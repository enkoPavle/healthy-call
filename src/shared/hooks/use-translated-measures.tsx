import { TMeasures } from "@/types/common";
import { useTranslation } from "react-i18next";

export const useTranslatedMeasures = () => {
  const { t } = useTranslation("measures");

  const measures = {
    cal: t("cal"),
    "cal/day": t("cal/day"),
    cm: t("cm"),
    kg: t("kg"),
    l: t("l"),
    workout: t("workout"),
  };

  const combineMeasurement = (value: number | string, measure: TMeasures) => {
    return `${value} ${measures[measure]}`;
  };

  return { ...measures, combineMeasurement };
};
