import React, { useState, useEffect } from 'react';
import { getAbsences, getMembers} from '../utils/api';
import PaginatedAbsenceList from '../components/PaginatedAbsenceList';
import FilterBar from '../components/FilterBar';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import EmptyStateComponent from '../components/EmptyStateComponent';
import PaginationButtons from '../components/PagincationButtons';
import { getAbsenceTypes } from '../utils/helperFunctions';

export default function AbsenceManager() {

    const [members, setMembers] = useState([]);
    const [absencesData, setAbsencesData] = useState([]);
    const [filteredAbsences, setFilteredAbsences] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);

    const [absencesTypes, setAbsencesTypes] = useState([]);

    //For testing purposes
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
                setAbsencesTypes(getAbsenceTypes(absencesData));
               // throw new Error("This is an intentional error.");

            })
            .catch(error => setError(error))
            .finally(async () => {
                await sleep(400)
                setIsLoading(false);
            });
    }, []);
    
    if (isLoading) 
        return <LoadingComponent/> 

    if (error) 
        return <ErrorComponent message={error.message} />

    if (absencesData.length === 0) 
        return <EmptyStateComponent/>;
    
    return(
        <div className='absence-manager'>  
            <p >
                <strong>Number of absences : </strong>
                {filteredAbsences.length} members
            </p>
            <FilterBar   absencesData={absencesData} 
                         absencesTypes={absencesTypes}
                         setFilteredAbsences={setFilteredAbsences} 
                         setCurrentPage={setCurrentPage}
            />
            {filteredAbsences.length === 0 && <p>No absences with this filter </p>}
            <PaginatedAbsenceList  members={members} 
                                   filteredAbsences={filteredAbsences} 
                                   currentPage={currentPage}
                                   setCurrentPage={setCurrentPage}
            />
           <PaginationButtons filteredAbsences={filteredAbsences} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}