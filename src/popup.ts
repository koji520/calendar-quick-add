import { extractDateTime } from "./extract";
import { createGoogleCalendarUrl } from "./google_calendar";

document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup script loaded');

  const heading = document.getElementById('heading') as HTMLHeadingElement;
  const eventText = document.getElementById('eventText') as HTMLTextAreaElement;
  const addButton = document.getElementById('addButton') as HTMLButtonElement;
  const status = document.getElementById('status') as HTMLDivElement;

  console.log('Elements found:', {heading, eventText, addButton, status });

  // i18n support
  heading.textContent = chrome.i18n.getMessage('popupHeading');
  eventText.placeholder = chrome.i18n.getMessage('popupEventTextPlaceholder');
  addButton.textContent = chrome.i18n.getMessage('popupAddButton');

  addButton.addEventListener('click', async () => {
    console.log('Add button clicked');
    const text = eventText.value.trim();
    
    if (!text) {
      showStatus(chrome.i18n.getMessage("popupStatusEmptyText"), 'error');
      return;
    }

    try {
      const userLang = chrome.i18n.getUILanguage();

      const { textWithoutDate, startDateTime, endDateTime } = extractDateTime(text, userLang);
      
      // For popup, don't include URL and title in description
      const calendarUrl = createGoogleCalendarUrl(textWithoutDate, "", startDateTime, endDateTime);
      
      // Open Google Calendar in a new tab
      chrome.tabs.create({ url: calendarUrl.href });
      
      // Clear the input and show success message
      eventText.value = '';
      showStatus(chrome.i18n.getMessage("popupStatusProgress"), 'success');
      
      // Close popup after a short delay
      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error) {
      showStatus(chrome.i18n.getMessage("popupStatusCommonError"), 'error');
      console.error(error);
    }
  });

  // Allow Enter key to submit (Shift+Enter for new line)
  eventText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addButton.click();
    }
  });

  function showStatus(message: string, type: 'success' | 'error') {
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    if (type === 'success') {
      setTimeout(() => {
        status.style.display = 'none';
      }, 3000);
    }
  }
});