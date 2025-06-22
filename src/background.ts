import { extractDateTime } from "./extract";
import { createGoogleCalendarUrl } from "./google_calendar";

const CONTEXT_MENU_ID = "google-calendar-quick-add";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: chrome.i18n.getMessage("contextMenusTitle") + ": “%s”",
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
  if (!info.selectionText) return;

  const userLang = chrome.i18n.getUILanguage();  // "ja", "en-US" など

  const { textWithoutDate, startDateTime, endDateTime } = extractDateTime(info.selectionText, userLang);

  const currentTab = await getCurrentTabMessage();

  const calendarUrl = createGoogleCalendarUrl(textWithoutDate, currentTab, startDateTime, endDateTime);

  chrome.tabs.create({ url: calendarUrl.href });
});
