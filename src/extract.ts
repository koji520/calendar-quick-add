import * as chrono from 'chrono-node';
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

function extractDateTime(text: string) {
  const parsedResult = chrono.ja.parse(text);

  if (parsedResult.length === 0) {
    return {
      textWithoutDate: text,
      startDateTime: undefined,
      endDateTime: undefined
    };
  }

  return {
    textWithoutDate: text.replace(parsedResult[0].text, ""),
    startDateTime: dayjs(parsedResult[0].start.date()),
    endDateTime: parsedResult[0].end ?  dayjs(parsedResult[0].end.date()) : dayjs(parsedResult[0].start.date()).add(1, 'hour')
  };
}

export { extractDateTime };
