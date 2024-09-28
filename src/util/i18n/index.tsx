import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./translations/en.json";
import uk from "./translations/uk.json";

export type TAppLanguages = "en" | "uk";

const DEFAULT_LANGUAGE = "en";

export const resources: Record<TAppLanguages, any> = {
  en,
  uk,
};

const init = async (store: any) => {
  const { userLanguage } = store.getState().i18n;
  const deviceLocale = Localization.getLocales()[0];
  const deviceLanguage = deviceLocale.languageCode;
  const hasAppDeviceLanguage = Object.keys(resources).includes(
    deviceLanguage ?? ""
  );

  const language =
    userLanguage || (hasAppDeviceLanguage ? deviceLanguage : DEFAULT_LANGUAGE);

  return await i18n.use(initReactI18next).init({
    lng: language,
    react: { useSuspense: false },
    compatibilityJSON: "v3",
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
};

export default init;
