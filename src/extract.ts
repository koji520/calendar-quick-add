import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);
const dateRegex =
  /(\d{4})?[年\/\-]?(\d{1,2})[月\/\-]?(\d{1,2})日?(?:\s*(\d{1,2})[:時](\d{1,2})?)?[分]?/;

function extractDateTime(text: string) {
  const match = text.match(dateRegex);

  if (!match) {
    return { textWithoutDate: text, startDateTime: null, endDateTime: null };
  }

  const now = dayjs();

  const year = match[1] ? parseInt(match[1]) : now.year();
  const month = match[2] ? parseInt(match[2]) : now.month() + 1;
  const day = match[3] ? parseInt(match[3]) : now.date();
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
    textWithoutDate: text.replace(dateRegex, ""),
    startDateTime: start,
    endDateTime: end,
  };
}

export { extractDateTime, dateRegex };
