import React, { useState, useEffect } from 'react';
import { getAbsences, getMembers } from '../utils/api';
import AbsenceItem from '../components/AbsenceItem';
import utils from '../utils/helperFunctions';

export default function AbsenceManager() {
    const [membersData, setMembersData] = useState([]);
    const [absencesData, setAbsencesData] = useState([]);
 
    useEffect(() => {
        getAbsences()
            .then(data => setAbsencesData(data) )
            .catch(error => console.log(error))
            
        getMembers()
            .then(data => setMembersData(data))
            .catch(error => console.log(error))

    }, [])
    
    const AbsenceItems = absencesData.map(item => {
        return <AbsenceItem 
            key = {item.id}
            name = {utils.getMemberName(item.userId, membersData)}
            type = {item.type}
            period = {utils.getPeriod(item.startDate, item.endDate)}
            memberNote = {item.memberNote}
            status = {utils.getStatus(item.confirmedAt, item.rejectedAt)}
            admitterNote = {item.admitterNote}
        />
    })

    return(
        <div>
            <h1>Absence Manager</h1>
            <div className='absence-list'> {AbsenceItems} </div>
        </div>
    )

}