const dateRegex =
/(\d{4})?[年\/\-]?(\d{1,2})[月\/\-]?(\d{1,2})日?(?:\s*(\d{1,2})[:時](\d{1,2})?)?/;

function extractDateTime(text: string) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const currentDate = today.getDate().toString().padStart(2, "0");

  const match = text.match(dateRegex);

  if (!match) return null;

  const year = match[1] || currentYear;
  const month = match[2] ? match[2].padStart(2, "0") : currentMonth
  const day = match[3] ? match[3].padStart(2, "0") : currentDate;
  const hour = match[4] ? match[4].padStart(2, "0") : "00";
  const minute = match[5] ? match[5].padStart(2, "0") : "00";

  const startDateTime = `${year}${month}${day}T${hour}${minute}00`;
  const endHour = (parseInt(hour, 10) + 1) % 24;
  const endDateTime = `${year}${month}${day}T${endHour.toString().padStart(2, "0")}${minute}00`;

  return { startDateTime, endDateTime };
}

export { extractDateTime, dateRegex };
