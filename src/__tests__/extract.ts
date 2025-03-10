import { extractDateTime } from "../extract";

describe("extractDateTime function", () => {
    test("should extract null", () => {
        expect(extractDateTime("aaaaaaaaa")).toEqual(
            null
        );
    });

    test("should extract full date and time", () => {
        expect(extractDateTime("ミーティング 2025/03/10 14:30")).toEqual({
            startDateTime: "20250310T143000",
            endDateTime: "20250310T153000"
        });
    });

    test("should handle date without year", () => {
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("3月10日 9時15分")).toEqual({
            startDateTime: `${currentYear}0310T091500`,
            endDateTime: `${currentYear}0310T101500`
        });
    });

    test("should handle date without time", () => {
        expect(extractDateTime("2024年5月20日")).toEqual({
            startDateTime: "20240520T000000",
            endDateTime: "20240520T010000"
        });
    });

    test("should handle short date format", () => {
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("7/4 18:00")).toEqual({
            startDateTime: `${currentYear}0704T180000`,
            endDateTime: `${currentYear}0704T190000`
        });
    });

    // test("should handle date without year", () => {
    //     const today = new Date()
    //     const currentYear = today.getFullYear();
    //     const currentMonth = today.getMonth() + 1;
    //     const currentDate = today.getDate();
    //     expect(extractDateTime("9時15分")).toEqual({
    //         startDateTime: `${currentYear}${currentMonth}${currentDate}T091500`,
    //         endDateTime: `${currentYear}${currentMonth}${currentDate}0310T101500`
    //     });
    // });
});
