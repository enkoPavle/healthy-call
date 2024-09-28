import dayjs from "dayjs";

export function getDateFromString(dateString: string) {
  return dayjs(dateString).toDate();
}

export function getCurrentDateWithZeroSeconds() {
  return dayjs().second(0).millisecond(0).toDate();
}

export function formatToHHMM(date: Date | string | number): string {
  return dayjs(date).format("HH:mm");
}

export function normalizeDate(dateString: string) {
  const currentDate = dayjs();
  const givenDate = dayjs(dateString);
  const combinedDateTime = currentDate
    .set("hour", givenDate.hour())
    .set("minute", givenDate.minute());

  if (combinedDateTime.isBefore(currentDate)) {
    return combinedDateTime.add(1, "day").toISOString();
  }

  return combinedDateTime.toISOString();
}

export function addOneYear(dateString: string) {
  return dayjs(dateString).add(1, "year").toISOString();
}
