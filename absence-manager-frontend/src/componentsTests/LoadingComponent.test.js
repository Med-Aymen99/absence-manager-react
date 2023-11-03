import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingComponent from '../components/LoadingComponent';

test('renders loading component', () => {
  render(<LoadingComponent />);

  const loadingText = screen.getByText('Loading the list of absences');
  expect(loadingText).toBeInTheDocument();
});
