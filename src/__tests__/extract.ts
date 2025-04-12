import { extractDateTime, dateRegex } from "../extract";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

describe("regex", () => {
    test("should null", () => {
        expect("aaaaa".match(dateRegex)).toBeNull();
    });

    test("should match full date and time", () => {
        const match = "2025/03/10 14:30".match(dateRegex)
        if (match) {
            expect(match[1]).toBe("2025");
            expect(match[2]).toBe("03");
        }
    });
    test("should handle short date format", () => {
        const match = "7/4 18:00".match(dateRegex)
        expect(match).not.toBeNull();
        if (match) {
            expect(match[1]).toBe(undefined);
            expect(match[2]).toBe("7");
            expect(match[3]).toBe("4");
            expect(match[4]).toBe("18");
            expect(match[5]).toBe("00");
        }
    });
});


describe("extractDateTime function", () => {
    test("should extract null", () => {
        expect(extractDateTime("aaaaaaaaa")).toEqual(
            {
                textWithoutDate: "aaaaaaaaa",
                startDateTime: null,
                endDateTime: null
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
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("3月10日 9時15分")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 9, minute: 15}),
            endDateTime: dayjs({year: currentYear, month: 3 - 1, day: 10, hour: 10, minute: 15})
        });
    });

    test("should handle date without time", () => {
        expect(extractDateTime("2024年5月20日")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 0, minute: 0}),
            endDateTime: dayjs({year: 2024, month: 5 - 1, day: 20, hour: 1, minute: 0})
        });
    });

    test("should handle short date format", () => {
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("7/4 18:00")).toEqual({
            textWithoutDate: "",
            startDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 18, minute: 0}),
            endDateTime: dayjs({year: currentYear, month: 7 - 1, day: 4, hour: 19, minute: 0})
        });
    });
});
