import { Event } from "expo-calendar";

export type TCalendarId = string | null;

export type TDaysOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type IReminderEvent = Pick<
  Event,
  | "allDay"
  | "calendarId"
  | "endDate"
  | "id"
  | "recurrenceRule"
  | "startDate"
  | "title"
>;

export interface IReminderFormData {
  id?: string;
  title: string;
  isActive: boolean;
  startDate: string;
}

export interface IBaseReminder {
  id: string;
  title: string;
  isActive: boolean;
  startDate: string;
}

export interface IReminderOptions {
  alarms: { absoluteDate: string }[];
  calendarId: string;
  dueDate: string;
  recurrenceRule: {
    frequency: string;
  };
  startDate: string;
  title: string;
}

export interface IReminder extends IReminderOptions {
  id: string;
  isActive: boolean;
  newId?: string;
}

export interface IReminderOptional extends Partial<IReminder> {
  id: string;
}

export interface IEventOptions {
  alarms: { method: string; relativeOffset: number }[];
  allDay: boolean;
  calendarId: string;
  endDate: string;
  recurrenceRule: {
    frequency: string;
  };
  startDate: string;
  title: string;
}

export interface IEvent extends IEventOptions {
  id: string;
  isActive: boolean;
  newId?: string;
}

export interface IEventOptional extends Partial<IEvent> {
  id: string;
}

export interface IAppReminderData {
  calendarId: TCalendarId;
  reminders: IReminder[];
  events: IEvent[];
}
