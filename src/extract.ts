import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);
const dateFormat = "YYYYMMDDTHHmmss";
const dateRegex =
  /(\d{4})?[年\/\-]?(\d{1,2})[月\/\-]?(\d{1,2})日?(?:\s*(\d{1,2})[:時](\d{1,2})?)?/;

function extractDateTime(text: string) {
  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month() + 1;
  const currentDate = now.date();

  const match = text.match(dateRegex);

  if (!match) return null;
  const year = match[1] ? parseInt(match[1]) : currentYear;
  const month = match[2] ? parseInt(match[2]) : currentMonth;
  const day = match[3] ? parseInt(match[3]) : currentDate;
  const hour = match[4] ? parseInt(match[4]) : 0;
  const minute = match[5] ? parseInt(match[5]) : 0;

  const start = dayjs({
    year: year,
    month: month - 1,
    day: day,
    hour: hour,
    minute: minute,
    second: 0,
  });
  const end = start.add(1, "hour");

  return {
    startDateTime: start.format(dateFormat),
    endDateTime: end.format(dateFormat),
  };
}

export { extractDateTime, dateRegex };
