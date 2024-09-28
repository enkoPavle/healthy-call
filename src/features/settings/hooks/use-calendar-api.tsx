import {
  createCalendarAsync,
  createEventAsync,
  createReminderAsync,
  deleteEventAsync,
  deleteReminderAsync,
  getCalendarsAsync,
  updateEventAsync,
  updateReminderAsync,
} from "expo-calendar";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createStoreEvent,
  createStoreReminder,
  updateStoreEvent,
  updateStoreReminder,
  setCalendarStoreId,
  deleteReminderById,
  deleteEventById,
} from "../store-features";
import { IReminderFormData, IBaseReminder } from "../types/reminders";
import {
  CALENDAR_OPTIONS,
  ENTITY_TYPES,
  checkIsEventPresent,
  checkIsReminderPresent,
  createEventOptions,
  createReminderOptions,
} from "../util/calendar";

export const useCalendarApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const calendarId = useAppSelector((state) => state.reminders.calendarId);

  const dispatch = useAppDispatch();

  const checkIsCalendarPresent = async (): Promise<boolean> => {
    try {
      if (!calendarId) return false;

      setIsLoading(true);

      const calendars = await getCalendarsAsync(ENTITY_TYPES);

      const appCalendar = calendars.some(
        (calendar) => calendar.id === calendarId
      );

      setIsLoading(false);
      return appCalendar;
    } catch (error) {
      console.log("Error in checkIsCalendarPresent:", error);
      setIsLoading(false);
      return false;
    }
  };

  const createCalendar = async (): Promise<string | null> => {
    try {
      setIsLoading(true);

      const calendarId = await createCalendarAsync(CALENDAR_OPTIONS);

      setIsLoading(false);
      return calendarId;
    } catch (error) {
      console.log("Error in createCalendar:", error);
      setIsLoading(false);
      return null;
    }
  };

  const setCalendarId = (calendarId: string) => {
    dispatch(setCalendarStoreId(calendarId));
  };

  // <!-- android section begin -->

  const createSystemEvent = async (
    reminderFormData: IReminderFormData
  ): Promise<string | null> => {
    try {
      if (!calendarId) return null;

      setIsLoading(true);

      const eventOptions = createEventOptions(calendarId, reminderFormData);
      const reminderId = eventOptions
        ? await createEventAsync(calendarId, eventOptions)
        : null;

      if (reminderId) {
        dispatch(
          createStoreEvent({
            id: reminderId,
            isActive: true,
            ...eventOptions!,
          })
        );
      }

      return reminderId;
    } catch (error) {
      console.log("Error in createSystemEvent:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSystemEvent = async (
    reminderFormData: IReminderFormData
  ): Promise<string | null> => {
    if (!calendarId) return null;

    setIsLoading(true);

    try {
      const isEventPresent = await checkIsEventPresent(reminderFormData.id);
      const eventOptions = createEventOptions(calendarId, reminderFormData);

      if (!reminderFormData.id) return null;

      if (isEventPresent && eventOptions) {
        const updatedEventId = await updateEventAsync(
          reminderFormData.id,
          eventOptions
        );

        if (updatedEventId) {
          dispatch(
            updateStoreEvent({
              id: updatedEventId,
              isActive: true,
              ...eventOptions,
            })
          );

          return updatedEventId;
        }
      } else if (reminderFormData.id) {
        dispatch(
          updateStoreEvent({
            id: reminderFormData.id,
            isActive: false,
            ...eventOptions,
          })
        );

        return reminderFormData.id;
      }
    } catch (error) {
      console.log("Error in updateSystemEvent:", error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const enableSystemEvent = async (
    baseReminderData: IBaseReminder
  ): Promise<string | null> => {
    if (!calendarId) return null;

    setIsLoading(true);

    try {
      const isEventPresent = await checkIsEventPresent(baseReminderData.id);

      if (isEventPresent) {
        dispatch(
          updateStoreEvent({
            id: baseReminderData.id,
            isActive: true,
          })
        );
        return baseReminderData.id;
      } else {
        const eventOptions = createEventOptions(calendarId, baseReminderData);

        if (eventOptions) {
          const eventId = await createEventAsync(calendarId, eventOptions);
          if (eventId) {
            dispatch(
              updateStoreEvent({
                id: baseReminderData.id,
                isActive: true,
                newId: eventId,
                ...eventOptions,
              })
            );
            return baseReminderData.id;
          }
        }
      }
    } catch (error) {
      console.log("Error in enableSystemEvent:", error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const disableSystemEvent = async (
    reminderId: string,
    force: boolean
  ): Promise<boolean | null> => {
    let isRemoved = false;
    if (!calendarId) return isRemoved;

    setIsLoading(true);

    try {
      const isEventPresent = await checkIsEventPresent(reminderId);

      if (isEventPresent) {
        await deleteEventAsync(reminderId);
        isRemoved = true;
      } else {
        isRemoved = true;
      }

      if (isRemoved) {
        if (force) {
          dispatch(deleteEventById(reminderId));
        } else {
          dispatch(updateStoreEvent({ id: reminderId, isActive: false }));
        }
      }
    } catch (error) {
      console.log("Error in disableSystemEvent:", error);
    } finally {
      setIsLoading(false);
    }

    return isRemoved;
  };
  // <!-- android section end -->

  // <!-- ios section begin -->

  const createSystemReminder = async (
    reminderFormData: IReminderFormData
  ): Promise<string | null> => {
    if (!calendarId) return null;

    setIsLoading(true);

    try {
      const reminderOptions = createReminderOptions(
        calendarId,
        reminderFormData
      );

      if (reminderOptions) {
        const reminderId = await createReminderAsync(
          calendarId,
          reminderOptions
        );
        if (reminderId) {
          dispatch(
            createStoreReminder({
              id: reminderId,
              isActive: true,
              ...reminderOptions,
            })
          );
          return reminderId;
        }
      }
    } catch (error) {
      console.log("Error in createSystemReminder:", error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const updateSystemReminder = async (
    reminderFormData: IReminderFormData
  ): Promise<string | null> => {
    if (!calendarId) return null;

    setIsLoading(true);

    try {
      const isReminderPresent = await checkIsReminderPresent(
        reminderFormData.id
      );
      const reminderOptions = createReminderOptions(
        calendarId,
        reminderFormData
      );

      if (!reminderFormData.id) return null;

      if (isReminderPresent && reminderOptions) {
        const updatedReminderId = await updateReminderAsync(
          reminderFormData.id,
          reminderOptions
        );

        if (updatedReminderId) {
          dispatch(
            updateStoreReminder({
              id: updatedReminderId,
              isActive: true,
              ...reminderOptions,
            })
          );
          return updatedReminderId;
        }
      } else {
        dispatch(
          updateStoreReminder({
            id: reminderFormData.id,
            isActive: false,
            ...reminderOptions,
          })
        );
        return reminderFormData.id;
      }
    } catch (error) {
      console.log("Error in updateSystemReminder:", error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const enableSystemReminder = async (
    baseReminderData: IBaseReminder
  ): Promise<string | null> => {
    if (!calendarId) return null;

    setIsLoading(true);

    try {
      const isReminderPresent = await checkIsReminderPresent(
        baseReminderData.id
      );

      if (isReminderPresent) {
        dispatch(
          updateStoreReminder({
            id: baseReminderData.id,
            isActive: true,
          })
        );
        return baseReminderData.id;
      } else {
        const reminderOptions = createReminderOptions(
          calendarId,
          baseReminderData
        );

        if (reminderOptions) {
          const reminderId = await createReminderAsync(
            calendarId,
            reminderOptions
          );
          if (reminderId) {
            dispatch(
              updateStoreReminder({
                id: baseReminderData.id,
                isActive: true,
                newId: reminderId,
                ...reminderOptions,
              })
            );
            return baseReminderData.id;
          }
        }
      }
    } catch (error) {
      console.log("Error in enableSystemReminder:", error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const disableSystemReminder = async (
    reminderId: string,
    force: boolean
  ): Promise<boolean> => {
    let isRemoved = false;
    if (!calendarId) return isRemoved;

    setIsLoading(true);

    try {
      const isReminderPresent = await checkIsReminderPresent(reminderId);

      if (isReminderPresent) {
        await deleteReminderAsync(reminderId);
        isRemoved = true;
      } else {
        isRemoved = true;
      }

      if (isRemoved) {
        if (force) {
          dispatch(deleteReminderById(reminderId));
        } else {
          dispatch(updateStoreReminder({ id: reminderId, isActive: false }));
        }
      }
    } catch (error) {
      console.log("Error in disableSystemReminder:", error);
    } finally {
      setIsLoading(false);
    }

    return isRemoved;
  };
  // <!-- ios section end -->

  return {
    isLoading,
    calendar: {
      create: createCalendar,
      isPresent: checkIsCalendarPresent,
      setId: setCalendarId,
    },
    reminder: {
      ios: {
        create: createSystemReminder,
        update: updateSystemReminder,
        enable: enableSystemReminder,
        disable: disableSystemReminder,
      },
      android: {
        create: createSystemEvent,
        update: updateSystemEvent,
        enable: enableSystemEvent,
        disable: disableSystemEvent,
      },
    },
  };
};
