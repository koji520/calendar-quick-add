import dayjs from "dayjs";
import { describe, it, expect } from "@jest/globals";
import { createGoogleCalendarUrl } from "../google_calendar";

describe("createGoogleCalendarUrl", () => {
  const details = "Test Title\nhttps://example.com";

  it("should generate a URL with only text and details when no dates are provided", () => {
    const url = createGoogleCalendarUrl("Event Title", details);
    expect(url.origin + url.pathname).toBe("https://calendar.google.com/calendar/r/eventedit");
    expect(url.searchParams.get("text")).toBe("Event Title");
    expect(url.searchParams.get("details")).toBe(details);
    expect(url.searchParams.get("dates")).toBeNull();
  });

  it("should generate a URL with text, details, and dates when start and end are provided", () => {
    const start = dayjs("2024-06-01T10:00:00");
    const end = dayjs("2024-06-01T11:00:00");
    const url = createGoogleCalendarUrl("Meeting", details, start, end);
    expect(url.searchParams.get("text")).toBe("Meeting");
    expect(url.searchParams.get("details")).toBe(details);
    expect(url.searchParams.get("dates")).toBe("20240601T100000/20240601T110000");
  });

  it("should not add dates param if dates are not provided", () => {
    const url = createGoogleCalendarUrl("Title", details, undefined, undefined);
    expect(url.searchParams.get("dates")).toBeNull();
  });

  it("should encode special characters in text and details", () => {
    const specialText = "タイトル & 予定";
    const specialDetails = "詳細: テスト\nhttps://example.com/?q=テスト";
    const url = createGoogleCalendarUrl(specialText, specialDetails);
    expect(url.searchParams.get("text")).toBe(specialText);
    expect(url.searchParams.get("details")).toBe(specialDetails);
  });
});