import React from 'react';
import {getAbsencePeriod, getAbsenceStatus} from '../utils/helperFunctions';
import AbsenceItem from './AbsenceItem';
import { absencesPerPage } from '../utils/constants';

const PaginatedAbsenceList = ({ filteredAbsences, members, currentPage }) => {

  const indexOfLastAbsence = currentPage * absencesPerPage;
  const indexOfFirstAbsence = indexOfLastAbsence - absencesPerPage;
  const currentAbsencesData = filteredAbsences.slice(indexOfFirstAbsence, indexOfLastAbsence);

  const currentAbsenceItems = currentAbsencesData.map(item => {
    return <AbsenceItem 
        key = {item.id}
        name = {members[item.userId]}
        type = {item.type}
        startDate = {item.startDate}
        endDate = {item.endDate}
        period = {getAbsencePeriod(item.startDate, item.endDate)}
        memberNote = {item.memberNote}
        status = {getAbsenceStatus(item.confirmedAt, item.rejectedAt)}
        admitterNote = {item.admitterNote}
    />
  })

  return (
    <div className='absence-list' >
      {currentAbsenceItems}
    </div>
    
  );
};

export default PaginatedAbsenceList;
