import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PaginationButtons from '../components/PagincationButtons';

describe('PaginationButtons Component', () => {
    const absencesPerPage = 10;
    const filteredAbsencesLength = 62;
    const setCurrentPage = jest.fn();
    const currentPage = 1;
    const numberOfPages = Math.ceil(filteredAbsencesLength / absencesPerPage);    
    

    test('renders the correct number of buttons', () => {
        render(
            <PaginationButtons 
                filteredAbsencesLength={filteredAbsencesLength}
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
        );

        for (let i = 1; i <= numberOfPages; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }


    });

    test('calls setCurrentPage when a button is clicked', () => {
        render(
            <PaginationButtons 
                filteredAbsencesLength={filteredAbsencesLength}
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
        );
        for (let i = 1; i <= numberOfPages; i++) {
            const button = screen.getByText(i);
            fireEvent.click(button);
            expect(setCurrentPage).toHaveBeenCalledWith(i);

        }    
    });
});
