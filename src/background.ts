import { extractDateTime } from "./extract";

const CONTEXT_MENU_ID = "google-calendar-quick-add";
const DATE_FORMAT = "YYYYMMDDTHHmmss";

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Googleカレンダーに追加",
    contexts: ["selection"],
  });
});

const getCurrentTabInfo = async (): Promise<chrome.tabs.Tab[]> => {
  return await chrome.tabs.query({ active: true, lastFocusedWindow: true });
}

const getCurrentTabMessage = async (): Promise<string> => {
  const tabs = await getCurrentTabInfo();
  const currentTitle = tabs[0].title || "";
  const currentUrl = tabs[0].url || "";
  const currentTab = `${currentTitle}\n${currentUrl}`;
  return currentTab;
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== CONTEXT_MENU_ID) return;

  const calendarUrl = new URL("https://calendar.google.com/calendar/r/eventedit");

  const selectedText = info.selectionText?.trim();
  if (selectedText) {

      const { textWithoutDate, startDateTime, endDateTime } = extractDateTime(selectedText);

      calendarUrl.searchParams.append("text", textWithoutDate);
      if (startDateTime) calendarUrl.searchParams.append("dates", startDateTime.format(DATE_FORMAT) + "/" + endDateTime.format(DATE_FORMAT));
      const currentTab = await getCurrentTabMessage();
      calendarUrl.searchParams.append("details", currentTab);

      chrome.tabs.create({ url: calendarUrl.href });
  }
});
