import React, { useState } from 'react';
import utils from '../utils/helperFunctions';
import AbsenceItem from '../components/AbsenceItem';

const Pagination = ({ absences, members }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const absencesPerPage = 10;

    const numberOfPages = Math.ceil(absences.length / absencesPerPage);    
    const indexOfLastAbsence = currentPage * absencesPerPage;
    const indexOfFirstAbsence = indexOfLastAbsence - absencesPerPage;
    const currentAbsencesData = absences.slice(indexOfFirstAbsence, indexOfLastAbsence);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const currentAbsenceItems = () => currentAbsencesData.map(item => {
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
                    className={i === currentPage ? 'active' : ''}
                    onClick={() => paginate(i)}>
                {i}
            </button>
        );
    }

    return (
    <div>
        <div className='absence-list' >
            {currentAbsenceItems()}
        </div>
    <ul>
        {pageButtons}
    </ul>
    </div>
    );
};

export default Pagination;
