import { extractDateTime } from "./extract";

const CONTEXT_MENU_ID = "add-to-google-calendar";

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Googleカレンダーに追加",
    contexts: ["selection", "page"],
  });
});


chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    const selectedText = info.selectionText?.trim();
    if (selectedText) {
      const encodedText = encodeURIComponent(selectedText);
      let datesParam = "";
      const dateTime = extractDateTime(selectedText);

      if (dateTime) {
        datesParam = `&dates=${dateTime.startDateTime}/${dateTime.endDateTime}`;
      }

      const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodedText}${datesParam}`;
      chrome.tabs.create({ url: calendarUrl });
    }
  }
});
