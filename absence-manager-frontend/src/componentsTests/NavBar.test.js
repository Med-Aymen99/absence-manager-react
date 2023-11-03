import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/NavBar';

test('renders Navbar component', () => {
    render(<Navbar />);

    const brandNameElement = screen.getByText(/Absence Manager/i);
    expect(brandNameElement).toBeInTheDocument();

    // Check if the navbar element has the correct class
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toHaveClass('navbar');
});
