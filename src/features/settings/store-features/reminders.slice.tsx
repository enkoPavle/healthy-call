import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TCalendarId,
  IAppReminderData,
  IReminder,
  IEvent,
  IEventOptional,
  IReminderOptional,
} from "../types/reminders";

const initialState: IAppReminderData = {
  calendarId: null,
  events: [],
  reminders: [],
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    setCalendarStoreId: (state, { payload }: PayloadAction<TCalendarId>) => {
      state.calendarId = payload;
    },
    createStoreEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.events.push(payload);
    },
    createStoreReminder: (state, { payload }: PayloadAction<IReminder>) => {
      state.reminders.push(payload);
    },
    updateStoreEvent: (state, { payload }: PayloadAction<IEventOptional>) => {
      const index = state.events.findIndex(
        (reminder) => reminder.id === payload.id
      );
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...payload,
          id: payload.newId ?? payload.id,
        };
      }
    },
    updateStoreReminder: (
      state,
      { payload }: PayloadAction<IReminderOptional>
    ) => {
      const index = state.reminders.findIndex(
        (reminder) => reminder.id === payload.id
      );
      if (index !== -1) {
        state.reminders[index] = {
          ...state.reminders[index],
          ...payload,
          id: payload.newId ?? payload.id,
        };
      }
    },
    deleteReminderById: (state, { payload }: PayloadAction<string>) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== payload
      );
    },
    deleteEventById: (state, { payload }: PayloadAction<string>) => {
      state.events = state.events.filter((reminder) => reminder.id !== payload);
    },
    clearRemindersData: () => {
      return initialState;
    },
  },
});

export const {
  setCalendarStoreId,
  createStoreEvent,
  createStoreReminder,
  updateStoreEvent,
  updateStoreReminder,
  deleteReminderById,
  deleteEventById,
  clearRemindersData,
} = remindersSlice.actions;

export default remindersSlice;
