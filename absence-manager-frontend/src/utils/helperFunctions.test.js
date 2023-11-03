import {generateICalData, getAbsencePeriod, getAbsenceStatus, getAbsenceTypes} from "./helperFunctions"

// Testing getAbsencePeriod function
describe('Absence Period Calculation', () => {
    test('calculate 3 days period', () => {
        const date1 = "2023-01-01";
        const date2 = "2023-01-03";
        expect(getAbsencePeriod(date1, date2)).toEqual(3);
    });
    test('calculate 3 months period', () => {
        const date1 = "2023-01-01";
        const date2 = "2023-03-01";
        expect(getAbsencePeriod(date1, date2)).toEqual(31+28+1);
    });
});

// Testing getAbsenceStatus function
describe('Absence Status generation', () => {
    test('should return Confirmed status', () => {
        const confirmedAt = "2021-01-09T17:45:47.000+01:00"
        const rejectedAt = null
        expect(getAbsenceStatus(confirmedAt,rejectedAt)).toEqual("Confirmed");
    });
    test('should return Rejected status', () => {
        const confirmedAt = null
        const rejectedAt = "2021-01-09T17:45:47.000+01:00"
        expect(getAbsenceStatus(confirmedAt,rejectedAt)).toEqual("Rejected");
    });
    test('should return Requested status', () => {
        const confirmedAt = null
        const rejectedAt = null
        expect(getAbsenceStatus(confirmedAt,rejectedAt)).toEqual("Requested");
    });
    test('should return Undefined status', () => {
        const confirmedAt = "2021-01-09T17:45:47.000+01:00"
        const rejectedAt = "2021-01-09T17:45:47.000+01:00"
        expect(getAbsenceStatus(confirmedAt,rejectedAt)).toEqual(undefined);
    });
});

// Testing getAbsenceTypes function
describe('Absence types generation', () => {
    test('should return a unique list of all the types', () => {
        const absences =  [
            { type: "sickneSS" },
            { type: "vAcatIon" },
            { type: "Sick LEAVE"},
            { type: "vacatIon" },
            { type: "Sickness"},
            { type: "SIcK leave"}
        ]
        expect(getAbsenceTypes(absences)).toEqual(["sickness", "vacation", "sick leave"]);
    });
});

// Testing generateICalData function
describe('iCal Data generation', () => {
    test('Should contain correct data', () => {
        const absence = 
            {
                name: 'John',
                type: 'Vacation',
                startDate: '2023-01-01',
                endDate: '2023-01-03',
            }
        const iCalData = generateICalData(absence)
        expect(iCalData).toContain("John");
        expect(iCalData).toContain("Vacation");
        expect(iCalData).toContain("DTSTART:20230101T000000Z");
        expect(iCalData).toContain("DTEND:20230103T000000Z");
    })
})
