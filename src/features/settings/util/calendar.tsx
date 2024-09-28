import {
  AlarmMethod,
  CalendarAccessLevel,
  EntityTypes,
  Frequency,
  SourceType,
  getEventAsync,
  getReminderAsync,
} from "expo-calendar";
import { Platform } from "react-native";
import { colors } from "@/constants/colors";
import {
  IEventOptions,
  IReminderFormData,
  IReminderOptions,
} from "../types/reminders";
import { addOneYear, normalizeDate } from "@/util/dayjs";

const isIOS = Platform.OS === "ios";

const CALENDAR_TITLE = "Healthy call";
const CALENDAR_COLOR = colors.bright_turquoise;
const ENTITY_TYPES = EntityTypes[isIOS ? "REMINDER" : "EVENT"];
const OWNER_ACCOUNT = "Healthy call";
const SOURCE = isIOS
  ? undefined
  : {
      id: "",
      isLocalAccount: true,
      name: CALENDAR_TITLE,
      type: SourceType.LOCAL,
    };

const CALENDAR_OPTIONS = {
  accessLevel: CalendarAccessLevel.OWNER,
  color: CALENDAR_COLOR,
  entityType: ENTITY_TYPES,
  isSynced: true,
  name: CALENDAR_TITLE,
  ownerAccount: OWNER_ACCOUNT,
  title: CALENDAR_TITLE,
  source: SOURCE,
};

function createEventOptions(
  calendarId: string | null,

  reminderFormData: IReminderFormData
): IEventOptions | null {
  if (!calendarId) return null;

  const { startDate, title } = reminderFormData;
  const date = normalizeDate(startDate);

  return {
    alarms: [{ method: AlarmMethod.ALERT, relativeOffset: 0 }],
    allDay: false,
    calendarId,
    endDate: date,
    recurrenceRule: {
      frequency: Frequency.DAILY,
    },
    startDate: date,
    title,
  };
}

function createReminderOptions(
  calendarId: string | null,
  reminderFormData: IReminderFormData
): IReminderOptions | null {
  if (!calendarId) return null;

  const { startDate, title } = reminderFormData;
  const date = normalizeDate(startDate);

  return {
    alarms: [{ absoluteDate: date }],
    calendarId,
    dueDate: addOneYear(date),
    recurrenceRule: { frequency: Frequency.DAILY },
    startDate,
    title,
  };
}

async function checkIsEventPresent(id: string | undefined): Promise<boolean> {
  try {
    if (!id) return false;

    await getEventAsync(id);
    return true;
  } catch (error) {
    console.log("Error in checkIsEventPresent:", error);
    return false;
  }
}

async function checkIsReminderPresent(
  id: string | undefined
): Promise<string | null> {
  if (!id) return null;

  try {
    const response = await getReminderAsync(id);
    return response.id as string;
  } catch (error) {
    console.log("Error in checkIsReminderPresent:", error);
    return null;
  }
}

export {
  ENTITY_TYPES,
  CALENDAR_OPTIONS,
  createReminderOptions,
  createEventOptions,
  checkIsEventPresent,
  checkIsReminderPresent,
};
