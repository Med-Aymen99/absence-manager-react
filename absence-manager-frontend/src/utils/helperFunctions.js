const utils = {
    getPeriod(date1, date2) {
        const firstDate = new Date(date1);
        const sedondDate = new Date(date2);
        const timeDiff = Math.abs(firstDate - sedondDate);
        const DaysDiff = Math.ceil(timeDiff / (1000*60*60*24)); 
        const period = DaysDiff + 1
        return period
    },

    getStatus(confirmedAt , rejectedAt) {
        return !confirmedAt && !rejectedAt ? "Requested" 
                    : confirmedAt ? "Confirmed"
                    : rejectedAt ? "Rejected"
                    : undefined
    },

    getMemberName(userId, membersData) {
        const member = membersData.find(item => item.userId === userId)
        return member.name
    }
}
export default utils