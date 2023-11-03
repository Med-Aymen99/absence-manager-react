import React from 'react';
import { render, screen} from '@testing-library/react';
import EmptyStateComponent from '../components/EmptyStateComponent';


test('renders the component with correct content', () => {
    render(<EmptyStateComponent />); 
    expect(screen.getByText('No absences found')).toBeInTheDocument();
    expect(screen.getByText('There is no data available at the moment.')).toBeInTheDocument();
});
