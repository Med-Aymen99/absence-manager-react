import React from 'react';
import { absencesPerPage } from '../utils/constants';

const PaginationButtons = ({ filteredAbsencesLength, currentPage, setCurrentPage }) => {

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const numberOfPages = Math.ceil(filteredAbsencesLength / absencesPerPage);    

    const pageButtons = [];

    for (let i = 1; i <= numberOfPages; i++) {
        pageButtons.push(  
            <button key={i} 
                    className={i === currentPage ? '' : 'pagination-button'}
                    onClick={() => paginate(i)}>
                {i}
            </button>
        );
    }
    
    return(
        <div className='pagination-bar'>
            {pageButtons}
        </div>
    )
    
}

export default PaginationButtons;