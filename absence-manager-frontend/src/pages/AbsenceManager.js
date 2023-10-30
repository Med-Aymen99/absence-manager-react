import React, { useState, useEffect } from 'react';
import { getAbsences, getMembers } from '../utils/api';
import Pagination from '../components/Pagination';

export default function AbsenceManager() {

    const [members, setMembers] = useState({});
    const [absencesData, setAbsencesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    
    useEffect(() => {
        console.log("useEffect")
        Promise.all([getAbsences(), getMembers()])
            .then(([absencesData, membersData]) => {
                setAbsencesData(absencesData);
                setMembers(oldMembers => {
                    const members = {}
                    membersData.forEach(member => members[member.userId] = member.name)
                    return members
                });
            })
            .catch(error => setError(error))
            .finally(async () => {
                await sleep(2000)
                setIsLoading(false);
            });
    }, []);
    

    if (isLoading) 
        return <div>Loading absences...</div> 

    if (error) 
        return  <div>Error: {error.message}</div>

    if (absencesData.length === 0) 
        return <div>No absences found</div>;
      
    return(
        <div>
            <h1>Absence Manager</h1>
            <Pagination  members={members} absences={absencesData}/>
        </div>
    )

}