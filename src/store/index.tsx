import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { unauthenticatedMiddleware } from "./middlewares/unauthenticated";
import i18nSlice from "./features/i18n.slice";
import { remindersSlice } from "@/features/settings/store-features";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appApi } from "./services/app";

const persistConfig = {
  key: "healthy-call",
  storage: AsyncStorage,
  whitelist: [i18nSlice.name, remindersSlice.name],
};

const reducers = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [i18nSlice.name]: i18nSlice.reducer,
  [remindersSlice.name]: remindersSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(unauthenticatedMiddleware, appApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
