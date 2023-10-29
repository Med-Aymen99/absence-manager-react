import React, { useState, useEffect } from 'react';
import { getAbsences, getMembers } from '../utils/api';
import AbsenceItem from '../components/AbsenceItem';
import utils from '../utils/helperFunctions';

export default function AbsenceManager() {

    const [membersData, setMembersData] = useState([]);
    const [absencesData, setAbsencesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("loading ?", isLoading)

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    useEffect(() => {
        Promise.all([getAbsences(), getMembers()])
            .then(([absencesData, membersData]) => {
                setAbsencesData(absencesData);
                setMembersData(membersData);
                //setAbsencesData([])
            })
            .catch(error => setError(error))
            .finally(async () => {
                await sleep(2000)
                setIsLoading(false);
            });
    }, []);
    

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

    if (isLoading) 
        return <div>Loading absences...</div> 

    if (error) 
        return  <div>Error: {error.message}</div>

    if (absencesData.length === 0) 
        return <div>No absences found</div>;
      
    return(
        <div>
            <h1>Absence Manager</h1>
            <div className='absence-list'> {AbsenceItems} </div>
        </div>
    )

}