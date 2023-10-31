import React, { useState, useEffect } from 'react';
import { getAbsences, getMembers } from '../utils/api';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';

export default function AbsenceManager() {

    const [members, setMembers] = useState([]);
    const [absencesData, setAbsencesData] = useState([]);
    const [filteredAbsences, setFilteredAbsences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const sleep = ms => new Promise(r => setTimeout(r, ms));
    
    useEffect(() => {
        Promise.all([getAbsences(), getMembers()])
            .then(([absencesData, membersData]) => {
                setAbsencesData(absencesData);
                setFilteredAbsences(absencesData);
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
        <div className='absence-manager'>
            <h1>Absence Manager</h1>
            <h3>Number of absences : {filteredAbsences.length} members</h3>
            <FilterBar absencesData={absencesData} setFilteredAbsences={setFilteredAbsences} />
            <Pagination  members={members} filteredAbsences={filteredAbsences}/>
        </div>
    )

}