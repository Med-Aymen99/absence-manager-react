import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AbsenceItem from '../components/AbsenceItem';
import { saveAs } from 'file-saver';

const absence = {
    key: 1,
    name: 'Aymen',
    type: 'Vacation',
    period: 2,
    status: 'Confirmed',
    memberNote: 'Going to the beach with my friends',
    admitterNote: 'Have fun !'
};

// Mock file-saver saveAs function
jest.mock('file-saver', () => {
    return {
      saveAs: jest.fn(),
    };
});


describe('AbsenceItem Component', () => {
  test('renders with Confirmed status', () => {
    
    render(<AbsenceItem {...absence} />);

    expect(screen.getByText('Aymen')).toBeInTheDocument(); 
    expect(screen.getByText('Vacation')).toBeInTheDocument();
    expect(screen.getByText('2 days')).toBeInTheDocument();
    expect(screen.getByText('Going to the beach with my friends')).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Have fun !')).toBeInTheDocument();

    // Check if the component has the correct color class
    expect(screen.getByTestId('absenceItem')).toHaveClass('green-item');

    // Check if the component has the download button
    expect(screen.getByText('Dwonload iCal')).toBeInTheDocument();

  })

  test('renders with Rejected status', () => {
    absence.status = 'Rejected'
    absence.admitterNote = 'Sorry'
    render(<AbsenceItem {...absence} />);

    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Sorry')).toBeInTheDocument();

    expect(screen.getByTestId('absenceItem')).toHaveClass('red-item');

  })

  test('renders with Requested status', () => {
    absence.status = 'Requested'    
    absence.admitterNote = ''

    render(<AbsenceItem {...absence} />);

    expect(screen.getByText('Requested')).toBeInTheDocument();
    expect(screen.getByTestId('absenceItem')).toHaveClass('yellow-item');

  })

  test('clicking Download iCal button calls handleDownload function', () => {

    render(<AbsenceItem {...absence} />);
    const downloadButton = screen.getByRole('button');
    fireEvent.click(downloadButton);
    
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'Aymen-absence.ics');

  });
});
