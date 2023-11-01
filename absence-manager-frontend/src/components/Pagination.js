import React from 'react';
import utils from '../utils/helperFunctions';
import AbsenceItem from '../components/AbsenceItem';

const Pagination = ({ filteredAbsences, members, currentPage, setCurrentPage }) => {
  //Extract constants:
  const absencesPerPage = 10;

  const numberOfPages = Math.ceil(filteredAbsences.length / absencesPerPage);    
  const indexOfLastAbsence = currentPage * absencesPerPage;
  const indexOfFirstAbsence = indexOfLastAbsence - absencesPerPage;
  const currentAbsencesData = filteredAbsences.slice(indexOfFirstAbsence, indexOfLastAbsence);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("current Page :", currentPage)


  const currentAbsenceItems = currentAbsencesData.map(item => {
    return <AbsenceItem 
        key = {item.id}
        name = {members[item.userId]}
        type = {item.type}
        period = {utils.getPeriod(item.startDate, item.endDate)}
        memberNote = {item.memberNote}
        status = {utils.getStatus(item.confirmedAt, item.rejectedAt)}
        admitterNote = {item.admitterNote}
    />
  })

  const pageButtons = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pageButtons.push(  
        <button key={i} 
                className={i === currentPage ? '' : 'pagination-buttons'}
                onClick={() => paginate(i)}>
            {i}
        </button>
    );
  }


  return (
    <div>
      <div className='absence-list' >{currentAbsenceItems} </div>
      <div className='pagination'>{pageButtons}</div>
    </div>
  );
};

export default Pagination;
