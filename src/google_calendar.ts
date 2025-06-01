import dayjs from "dayjs";

const createGoogleCalendarUrl = (text: string, details: string, startDateTime?: dayjs.Dayjs, endDateTime?: dayjs.Dayjs): URL => {
  const GOOGLE_CALENDAR_BASE_URL = "https://calendar.google.com/calendar/r/eventedit";
  const DATE_FORMAT = "YYYYMMDDTHHmmss";

  const calendarUrl = new URL(GOOGLE_CALENDAR_BASE_URL);
  calendarUrl.searchParams.append("text", text);
  
  if (startDateTime && endDateTime) {
    const startDateTimeString = startDateTime.format(DATE_FORMAT);
    const endDateTimeString = endDateTime.format(DATE_FORMAT);
    calendarUrl.searchParams.append("dates", startDateTimeString + "/" + endDateTimeString);
  }

  calendarUrl.searchParams.append("details", details);

  return calendarUrl;
}

export { createGoogleCalendarUrl };
