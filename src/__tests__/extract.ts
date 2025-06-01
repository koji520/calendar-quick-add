import { extractDateTime } from "../extract";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);


describe("extractDateTime function", () => {
    const currentYear = new Date().getFullYear();
    test("should extract undefined", () => {
        expect(extractDateTime("aaaaaaaaa")).toEqual(
            {
                textWithoutDate: "aaaaaaaaa",
                startDateTime: undefined,
                endDateTime: undefined
            }
        );
    });

    test("should extract full date and time", () => {
        expect(extractDateTime("ミーティング 2025/03/10 14:30")).toEqual({
            textWithoutDate: "ミーティング ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 14, minute: 30}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 15, minute: 30})
        });
    });

    test("should handle date without year", () => {
        expect(extractDateTime("3月10日 9時15分")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 9, minute: 15}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 15})
        });
    });

    test("should handle date without time", () => {
        expect(extractDateTime("2024年5月20日")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 12, minute: 0}),
            endDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 13, minute: 0})
        });
    });

    test("should handle short date format", () => {
        expect(extractDateTime("7/4 18:00")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });

    test("should handle zenkaku short date format", () => {
        expect(extractDateTime("７／４　１８：００")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });
});


describe("extractDateTime function range", () => {
    const currentYear = new Date().getFullYear();
    test("should extract full date and time", () => {
        expect(extractDateTime("ミーティング 2025/03/10 14:30 ~ 16:00")).toEqual({
            textWithoutDate: "ミーティング ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 14, minute: 30}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 16, minute: 0})
        });
    });
    test("should extract full date and time", () => {
        expect(extractDateTime("展示会 2025/03/10 10:00 ~ 2025/03/11 17:00")).toEqual({
            textWithoutDate: "展示会 ",
            startDateTime: dayjs({year: 2025, month: 3 - 1, day: 10, hour: 10, minute: 0}),
            endDateTime: dayjs({year: 2025, month: 3 - 1, day: 11, hour: 17, minute: 0})
        });
    });
    test("should extract short date and short time", () => {
        expect(extractDateTime("展示会 3月10日 10時 ～ 3月11日 17時")).toEqual({
            textWithoutDate: "展示会 ",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 11, hour: 17, minute: 0})
        });
    });
})
