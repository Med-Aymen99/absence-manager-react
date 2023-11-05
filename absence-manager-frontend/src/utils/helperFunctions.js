import ical from 'ical-generator';

export const getAbsencePeriod = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const timeDiff = Math.abs(firstDate - secondDate);
    const DaysDiff = Math.ceil(timeDiff / (1000*60*60*24)); 
    const period = DaysDiff + 1
    return period;
};

export const getAbsenceStatus = (confirmedAt, rejectedAt) => {
    return !confirmedAt && !rejectedAt ? "Requested"
                : confirmedAt && rejectedAt ? undefined 
                : confirmedAt ? "Confirmed"
                : "Rejected"
};

// This function is used to get the absence types for the filter bar select options
export const getAbsenceTypes = (absencesData) => {
    const types = absencesData.map(absence => absence.type.toLowerCase());
    return [...new Set(types)];
}

export const generateICalData = (absence) => {
    const cal = ical();
    cal.createEvent({
        start: absence.startDate,
        end: absence.endDate,
        summary: `${absence.type} - ${absence.name}`,
        description: `Member name: ${absence.name}\nAbsence Type: ${absence.type}\nPeriod: ${absence.startDate} to ${absence.endDate}`,
    });
    return cal.toString();
};
