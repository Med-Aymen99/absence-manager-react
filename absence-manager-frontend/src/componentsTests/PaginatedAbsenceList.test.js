import { screen, render } from '@testing-library/react';
import React from 'react';
import PaginatedAbsenceList from '../components/PaginatedAbsenceList';

const absences = [
    {
        admitterId: null,
        id: 26346,
        createdAt: "2023-01-01T13:19:37.000+01:00",
        crewId: 352,
        type: 'vacation leave',
        startDate: '2023-01-01',
        endDate: '2023-01-03',
        rejectedAt: "2023-01-01T13:30:37.000+01:00",
        memberNote: 'Taking a short break',
        confirmedAt: null,
        admitterNote: ' Sorry ! Your request has been rejected.',
        userId: 27
    },

    {
        admitterId: null,
        createdAt: "2023-02-12T13:19:45.000+01:00",
        crewId: 3955,
        type: 'sickness',
        startDate: '2023-02-12',
        endDate: '2023-02-13',
        rejectedAt: null,
        memberNote: 'I am sick',
        confirmedAt: null,
        admitterNote: '',
        userId: 8899
    },
];

const members = {
    2797: "Johannes",
    2798: "Max",
    27: "Aymen",
    2799: "Robert",
    8899: "Ahmed"
};

describe('PaginatedAbsenceList Component', () => {
    test('renders Correct Information', () => {

        render(
            <PaginatedAbsenceList
                members={members} 
                filteredAbsences={absences} 
                currentPage={1}
            />
        );

        expect(screen.getByText('Aymen')).toBeInTheDocument();
        expect(screen.getByText('Ahmed')).toBeInTheDocument();
    
        // Check if absence types are rendered
        const vacationType = screen.getAllByText('vacation leave');
        const sicknessType = screen.getAllByText('sickness');
        expect(vacationType.length).toBe(1);
        expect(sicknessType.length).toBe(1);
    
        // Check if Admitter notes are rendered
        expect(screen.getByText('Sorry ! Your request has been rejected.')).toBeInTheDocument();
    
        // Check if absence period are rendered and correctly calculated
        expect(screen.getByText('2 days')).toBeInTheDocument();
        expect(screen.getByText('3 days')).toBeInTheDocument();
    
        // Check if absence status are rendered and correctly generated
        expect(screen.getByText('Rejected')).toBeInTheDocument();
        expect(screen.getByText('Requested')).toBeInTheDocument();

    
        // Check if member notes are rendered 
        expect(screen.getByText('Taking a short break')).toBeInTheDocument();
        expect(screen.getByText('I am sick')).toBeInTheDocument();
    });

});
