import {
  useCalendarPermissions,
  useRemindersPermissions,
  PermissionStatus,
  deleteCalendarAsync,
} from "expo-calendar";
import { useSegments } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import { useCalendarApi } from "../hooks";
import { useAppSelector } from "@/store";
import {
  IBaseReminder,
  IEvent,
  IReminder,
  IReminderFormData,
} from "@/features/settings/types/reminders";

export interface RemindersContextValue {
  isLoading: boolean;
  isReady: boolean;
  isPermissionsDenied: boolean;
  events: IEvent[];
  reminders: IReminder[];
  onReminderFormSubmit: (reminder: IReminderFormData) => Promise<string | null>;
  onReminderRemove: (reminderId: string) => Promise<boolean | null>;
  onReminderSwitch: (
    reminder: IBaseReminder
  ) => Promise<string | boolean | null>;
}

const isIOS = Platform.OS === "ios";

export const RemindersContext = createContext<RemindersContextValue | null>(
  null
);

const useIOSRemindersPermissions = isIOS ? useRemindersPermissions : () => [];

export const RemindersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [calendarStatus, requestCalendarPermission] = useCalendarPermissions();
  const [reminderStatus, requestReminderPermission] =
    useIOSRemindersPermissions();
  const { events, reminders } = useAppSelector((state) => state.reminders);

  const { isLoading, calendar, reminder } = useCalendarApi();

  const segments = useSegments();

  const onReminderFormSubmit = async (reminderFormData: IReminderFormData) => {
    if (isIOS && reminderFormData.id) {
      return await reminder.ios.update(reminderFormData);
    } else if (isIOS && !reminderFormData.id) {
      return await reminder.ios.create(reminderFormData);
    } else if (!isIOS && reminderFormData.id) {
      return await reminder.android.update(reminderFormData);
    } else if (!isIOS && !reminderFormData.id) {
      return await reminder.android.create(reminderFormData);
    } else {
      console.error("onReminderFormSubmit");
      return null;
    }
  };

  const onReminderRemove = async (reminderId: string) => {
    if (isIOS) {
      return await reminder.ios.disable(reminderId, true);
    } else {
      return await reminder.android.disable(reminderId, true);
    }
  };

  const onReminderSwitch = async (baseReminderData: IBaseReminder) => {
    const { id, isActive } = baseReminderData;

    if (isIOS && isActive) {
      return await reminder.ios.disable(id, false);
    } else if (isIOS && !isActive) {
      return await reminder.ios.enable(baseReminderData);
    } else if (!isIOS && isActive) {
      return await reminder.android.disable(id, false);
    } else if (!isIOS && !isActive) {
      return await reminder.android.enable(baseReminderData);
    } else return null;
  };

  const initialize = async () => {
    if (isInitLoading) return;

    setIsInitLoading(true);

    const isSavedCalendarExist = await calendar.isPresent();

    if (!isSavedCalendarExist) {
      const newCalendarID = await calendar.create();
      if (newCalendarID) calendar.setId(newCalendarID);
    }

    setIsReady(true);
    setIsInitLoading(false);
  };

  const allPermissionsGranted = useMemo(() => {
    return calendarStatus?.granted && (!isIOS || reminderStatus?.granted);
  }, [calendarStatus, reminderStatus]);

  useEffect(() => {
    const isReminderScreen = segments.some(
      (segment) => segment === "reminders"
    );

    if (isReminderScreen) {
      if (!calendarStatus || calendarStatus?.canAskAgain) {
        requestCalendarPermission();
      }
      if ((isIOS && !reminderStatus) || reminderStatus?.canAskAgain) {
        requestReminderPermission();
      }
    }
  }, [segments]);

  useEffect(() => {
    if (
      calendarStatus?.granted &&
      (!isIOS || reminderStatus?.granted) &&
      !isReady
    ) {
      initialize();
    }
  }, [allPermissionsGranted]);

  const value = useMemo(() => {
    const isCalendarPermissionsDenied =
      calendarStatus?.canAskAgain === false &&
      calendarStatus.status === PermissionStatus.DENIED;

    const isRemindersPermissionsDenied =
      reminderStatus?.canAskAgain === false &&
      reminderStatus.status === PermissionStatus.DENIED;

    const isPermissionsDenied =
      isCalendarPermissionsDenied || isRemindersPermissionsDenied;

    return {
      isLoading,
      isReady,
      isPermissionsDenied,
      events,
      reminders,
      onReminderFormSubmit,
      onReminderRemove,
      onReminderSwitch,
    };
  }, [isLoading, isReady, calendarStatus, reminderStatus, events, reminders]);

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useRemindersContext = () => {
  const remindersContext = useContext(RemindersContext);

  return remindersContext as RemindersContextValue;
};
