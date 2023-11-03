import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders footer component', () => {
  render(<Footer />);
  
  const textElement = screen.getByText(/© 2023 Made by Aymen/i);
  expect(textElement).toBeInTheDocument();

  // Check if the footer element has the correct class
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toHaveClass('footer');

});
