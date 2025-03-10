function extractDateTime(text: String) {
  const currentYear = new Date().getFullYear();
  const dateRegex =
    /(\d{4})?[年\/\-]?(\d{1,2})[月\/\-](\d{1,2})日?(?:\s*(\d{1,2})[:時](\d{1,2})?)?/;
  const match = text.match(dateRegex);

  if (!match) return null;

  const year = match[1] ? match[1] : currentYear;
  const month = match[2].padStart(2, "0");
  const day = match[3].padStart(2, "0");
  const hour = match[4] ? match[4].padStart(2, "0") : "00";
  const minute = match[5] ? match[5].padStart(2, "0") : "00";

  const startDateTime = `${year}${month}${day}T${hour}${minute}00`;
  const endDateTime = `${year}${month}${day}T${(parseInt(hour) + 1)
    .toString()
    .padStart(2, "0")}${minute}00`;

  return { startDateTime, endDateTime };
}

export { extractDateTime };
