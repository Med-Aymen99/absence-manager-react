import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

const startDate1 = '2023-11-04'
const endDate1 = '2023-11-06'

const startDate2 = '2023-11-03'
const endDate2 = '2023-11-08'

const absencesData = [
    { type: 'sick', startDate: startDate1, endDate: endDate1 },
    { type: 'sick', startDate: startDate1, endDate: endDate2 },
    { type: 'sick', startDate: startDate2, endDate: endDate1 },
    { type: 'sick', startDate: startDate2, endDate: endDate2 },
    { type: 'vacation', startDate: startDate1, endDate: endDate2 },
    { type: 'vacation', startDate: startDate1, endDate: endDate1 },
    { type: 'vacation', startDate: startDate2, endDate: endDate1 },
    { type: 'vacation', startDate: startDate2, endDate: endDate2 },

];
const absencesTypes = ['sick', 'vacation'];

const setFilteredAbsences = jest.fn();
const setCurrentPage = jest.fn();

afterEach(cleanup)


describe('FilterBar', () => {
     test('should render the correct items using the startDate and endDate filters', () => {
        render(
            <FilterBar
                absencesData={absencesData}
                setFilteredAbsences={setFilteredAbsences}
                setCurrentPage={setCurrentPage}
                absencesTypes={absencesTypes}
            />
        );
    
        const startDateInput = screen.getByLabelText('start Date :');
        const endDateInput = screen.getByLabelText('End Date :');
        const filterButton = screen.getByText('Filter');


        fireEvent.change(startDateInput, { target: { value: startDate1 }});
        fireEvent.change(endDateInput, { target: { value: endDate1 } });
        fireEvent.click(filterButton);


        //Check if the result is correct
        expect(setCurrentPage).toHaveBeenCalledWith(1);
        expect(setFilteredAbsences).toHaveBeenCalledWith([absencesData[0], absencesData[5]]);
    })

    test('should render the correct items using the typeFilter', () => {
        render(
            <FilterBar
                absencesData={absencesData}
                setFilteredAbsences={setFilteredAbsences}
                setCurrentPage={setCurrentPage}
                absencesTypes={absencesTypes}
            />
        );
    
        const typeFilterInput = screen.getByPlaceholderText('Filter by type');
        const filterButton = screen.getByText('Filter');
        
        
        //Filter with type
        fireEvent.change(typeFilterInput, { target: { value: absencesTypes[0] } });
        fireEvent.click(filterButton);
        //Check if the result is correct
        expect(setCurrentPage).toHaveBeenCalledWith(1);
        expect(setFilteredAbsences).toHaveBeenCalledWith(absencesData.slice(0, 4));
        


    });
   
    test('should render the correct items using all filters', () => {
        render(
            <FilterBar
                absencesData={absencesData}
                setFilteredAbsences={setFilteredAbsences}
                setCurrentPage={setCurrentPage}
                absencesTypes={absencesTypes}
            />
        );
        
        const typeFilterInput = screen.getByPlaceholderText('Filter by type');
        const startDateInput = screen.getByLabelText('start Date :');
        const endDateInput = screen.getByLabelText('End Date :');
        const filterButton = screen.getByText('Filter');

        fireEvent.change(typeFilterInput, { target: { value: absencesTypes[1] } });
        fireEvent.change(startDateInput, { target: { value: startDate1 }});
        fireEvent.change(endDateInput, { target: { value: endDate1 } });
        fireEvent.click(filterButton);
        //Check if the result is correct
        expect(setCurrentPage).toHaveBeenCalledWith(1);
        expect(setFilteredAbsences).toHaveBeenCalledWith([absencesData[5]]);
    })

    test('should reset filters on "cancel filter" button click', () => {
        render(
            <FilterBar
                absencesData={absencesData}
                setFilteredAbsences={setFilteredAbsences}
                setCurrentPage={setCurrentPage}
                absencesTypes={absencesTypes}
            />
        );
        const endDateInput = screen.getByLabelText('End Date :');
        const filterButton = screen.getByText('Filter');

        fireEvent.change(endDateInput, { target: { value: endDate1 } });
        fireEvent.click(filterButton);
        const cancelFilterButton =  screen.getByText('cancel filter');
        fireEvent.click(cancelFilterButton);

        //Check if the result is correct
        expect(setFilteredAbsences).toHaveBeenCalledWith(absencesData);
    })

    
})
