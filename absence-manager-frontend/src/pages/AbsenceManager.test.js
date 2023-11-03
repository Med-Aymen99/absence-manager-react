import React from 'react';
import { render, screen } from '@testing-library/react';
import AbsenceManager from './AbsenceManager';
import { getAbsences, getMembers } from '../utils/api';

// Mocking the API functions
jest.mock('../utils/api', () => ({
  getAbsences: jest.fn(),
  getMembers: jest.fn(),
}));

describe('AbsenceManager', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    getAbsences.mockReset();
    getMembers.mockReset();
  });

  test('renders loading component while data is loading', async () => {
    getAbsences.mockResolvedValue([]);
    getMembers.mockResolvedValue([]);

    render(<AbsenceManager />);

    expect(screen.getByText('Loading the list of absences')).toBeInTheDocument();

    // Wait for data loading to complete
    await screen.findByText('No absences found');
  });

  test('renders error component when there is an error', async () => {
    const errorMessage = 'An intentional error occurred';
    getAbsences.mockRejectedValue(new Error(errorMessage));
    getMembers.mockResolvedValue([]);

    render(<AbsenceManager />);

    // Wait for error handling to complete
    await screen.findByText(errorMessage);
  });

  test('renders empty state component when there are no absences', async () => {
    getAbsences.mockResolvedValue([]);
    getMembers.mockResolvedValue([]);

    render(<AbsenceManager />);

    // Wait for empty state component to render
    await screen.findByText('No absences found');
  });

  test('renders absence manager with data', async () => {
    const absencesData = [
        {
            "admitterId": null,
            "admitterNote": "Sorry",
            "confirmedAt": null,
            "createdAt": "2021-01-03T17:36:52.000+01:00",
            "crewId": 352,
            "endDate": "2021-01-05",
            "id": 2521,
            "memberNote": "A whole day",
            "rejectedAt": "2021-01-03T17:39:50.000+01:00",
            "startDate": "2021-01-05",
            "type": "vacation",
            "userId": 2664
          },
          {
            "admitterId": null,
            "admitterNote": "",
            "confirmedAt": "2023-11-01T18:43:29.000+01:00",
            "createdAt": "2023-11-01T17:45:47.000+01:00",
            "crewId": 352,
            "endDate": "2023-11-07",
            "id": 2634,
            "memberNote": "One week",
            "rejectedAt": null,
            "startDate": "2023-11-01",
            "type": "sickness",
            "userId": 649
          }
      
    ];

    const membersData = [
        {
          "crewId": 352,
          "id": 2245,
          "image": "https://loremflickr.com/300/400",
          "name": "Monika",
          "userId": 2290
        },
        {
            "crewId": 352,
            "id": 2650,
            "image": "https://loremflickr.com/300/400",
            "name": "Aymen",
            "userId": 2664
        },
        {
            "crewId": 352,
            "id": 713,
            "image": "https://loremflickr.com/300/400",
            "name": "Salma",
            "userId": 649
        }

    ];

    getAbsences.mockResolvedValue(absencesData);
    getMembers.mockResolvedValue(membersData);

    render(<AbsenceManager />);

    // Wait for absence manager content to render
    await screen.findByText('2 members');

    // Check if member names are rendered
    expect(screen.getByText('Aymen')).toBeInTheDocument();
    expect(screen.getByText('Salma')).toBeInTheDocument();

    // Check if absence types are rendered
    const vacationType = screen.getAllByText('vacation');
    const sicknessType = screen.getAllByText('sickness');
      // + 1 because of the filter "absence type" option
    expect(vacationType.length).toBe(2);
    expect(sicknessType.length).toBe(2);

    // Check if Admitter notes are rendered
    expect(screen.getByText('Sorry')).toBeInTheDocument();

    // Check if absence period are rendered and correctly calculated
    expect(screen.getByText('1 day')).toBeInTheDocument();
    expect(screen.getByText('7 days')).toBeInTheDocument();

    // Check if absence status are rendered and correctly generated
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    
  });
});
