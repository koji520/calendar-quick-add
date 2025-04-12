import { extractDateTime } from "./extract";

const CONTEXT_MENU_ID = "google-calendar-quick-add";

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Googleカレンダーに追加",
    contexts: ["selection"],
  });
});


chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    const baseUrl = "https://calendar.google.com/calendar/r/eventedit"
    const calendarUrl = new URL(baseUrl);

    const selectedText = info.selectionText?.trim();
    if (selectedText) {
      const extractResult = extractDateTime(selectedText);

      calendarUrl.searchParams.append("text", extractResult.textWithoutDate);
      if (extractResult.startDateTime) calendarUrl.searchParams.append("dates", extractResult.startDateTime + "/" + extractResult.endDateTime);
    }
    chrome.tabs.create({ url: calendarUrl.href });
  }
});
