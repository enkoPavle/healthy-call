import { TAppLanguages } from "@/util/i18n";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { userLanguage: TAppLanguages | null } = {
  userLanguage: null,
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<TAppLanguages>) => {
      state.userLanguage = payload;
    },
  },
});

export const { setLanguage } = i18nSlice.actions;

export default i18nSlice;
