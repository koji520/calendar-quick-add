import { extractDateTime, dateRegex } from "../extract";


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
    // test("should handle only date format", () => {
    //     const match = "18:00".match(dateRegex)
    //     expect(match).not.toBeNull();
    //     if (match) {
    //         expect(match[1]).toBeUndefined();
    //         expect(match[2]).toBeUndefined();
    //         expect(match[3]).toBeUndefined();
    //         expect(match[4]).toBe("18");
    //         expect(match[5]).toBe("00");
    //     }
    // });
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
            startDateTime: "20250310T143000",
            endDateTime: "20250310T153000"
        });
    });

    test("should handle date without year", () => {
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("3月10日 9時15分")).toEqual({
            textWithoutDate: "",
            startDateTime: `${currentYear}0310T091500`,
            endDateTime: `${currentYear}0310T101500`
        });
    });

    test("should handle date without time", () => {
        expect(extractDateTime("2024年5月20日")).toEqual({
            textWithoutDate: "",
            startDateTime: "20240520T000000",
            endDateTime: "20240520T010000"
        });
    });

    test("should handle short date format", () => {
        const currentYear = new Date().getFullYear();
        expect(extractDateTime("7/4 18:00")).toEqual({
            textWithoutDate: "",
            startDateTime: `${currentYear}0704T180000`,
            endDateTime: `${currentYear}0704T190000`
        });
    });

    // test("should handle date without year", () => {
    //     const today = new Date()
    //     const currentYear = today.getFullYear();
    //     const currentMonth = today.getMonth() + 1;
    //     const currentDate = today.getDate();
    //     expect(extractDateTime("9:15")).toEqual({
    //         startDateTime: `${currentYear}${currentMonth}${currentDate}T091500`,
    //         endDateTime: `${currentYear}${currentMonth}${currentDate}T101500`
    //     });
    // });
});
