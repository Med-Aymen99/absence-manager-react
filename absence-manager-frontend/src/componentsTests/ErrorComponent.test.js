import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorComponent from '../components/ErrorComponent';


test('renders ErrorComponent with the given error message', () => {
    const errorMessage = 'Oupsie ! Something went wrong';
    render(<ErrorComponent message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
