import { extractDateTime } from "../extract";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);


describe("extractDateTime function - ja", () => {
    const currentYear = new Date().getFullYear();
    test("should extract undefined", () => {
        expect(extractDateTime("aaaaaaaaa", "ja")).toEqual(
            {
                textWithoutDate: "aaaaaaaaa",
                startDateTime: undefined,
                endDateTime: undefined
            }
        );
    });

    test("should extract full date and time", () => {
        expect(extractDateTime("ミーティング 2025/03/10 14:30", "ja")).toEqual({
            textWithoutDate: "ミーティング ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 14, minute: 30}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 15, minute: 30})
        });
    });

    test("should handle date without year", () => {
        expect(extractDateTime("3月10日 9時15分", "ja")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 9, minute: 15}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 15})
        });
    });

    test("should handle date without time", () => {
        expect(extractDateTime("2024年5月20日", "ja")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 12, minute: 0}),
            endDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 13, minute: 0})
        });
    });

    test("should handle short date format", () => {
        expect(extractDateTime("7/4 18:00", "ja")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });

    test("should handle zenkaku short date format", () => {
        expect(extractDateTime("７／４　１８：００", "ja")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });
});


describe("extractDateTime function range - ja", () => {
    const currentYear = new Date().getFullYear();
    test("should extract full date and time", () => {
        expect(extractDateTime("ミーティング 2025/03/10 14:30 ~ 16:00", "ja")).toEqual({
            textWithoutDate: "ミーティング ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 14, minute: 30}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 16, minute: 0})
        });
    });
    test("should extract full date and time", () => {
        expect(extractDateTime("展示会 2025/03/10 10:00 ~ 2025/03/11 17:00", "ja")).toEqual({
            textWithoutDate: "展示会 ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 10, minute: 0}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 11, hour: 17, minute: 0})
        });
    });
    test("should extract short date and short time", () => {
        expect(extractDateTime("展示会 3月10日 10時 ～ 3月11日 17時", "ja")).toEqual({
            textWithoutDate: "展示会 ",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 11, hour: 17, minute: 0})
        });
    });
})


describe("extractDateTime function - en", () => {
    const currentYear = new Date().getFullYear();

    test("should extract full date and time", () => {
        expect(extractDateTime("meeting 14:30 at 3/10/2025", "en")).toEqual({
            textWithoutDate: "meeting ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 14, minute: 30}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 15, minute: 30})
        });
    });
    test("should handle date without year", () => {
        expect(extractDateTime("March 10th at 9:15 AM", "en")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 9, minute: 15}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 15})
        });
    });
    test("should handle date without year 2", () => {
        expect(extractDateTime("Meeting at 3 PM on 15th March", "en")).toEqual({
            textWithoutDate: "Meeting ",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 15, hour: 15, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 15, hour: 16, minute: 0})
        });
    });
    test("should handle date without time", () => {
        expect(extractDateTime("May 20, 2024", "en")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 12, minute: 0}),
            endDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 13, minute: 0})
        });
    });
    test("should handle weekday date format", () => {
        expect(extractDateTime("Monday, July 4th at 18:00", "en")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });
    
})
