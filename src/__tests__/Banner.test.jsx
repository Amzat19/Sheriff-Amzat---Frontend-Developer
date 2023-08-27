import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '../components/Banner';

// Mock the SVG components
jest.mock('../assets/spacex.svg', () => {
  return {
    ReactComponent: () => <svg data-testid='mock-spacex-icon'></svg>,
  };
});

jest.mock('../assets/menu.svg', () => {
  return {
    ReactComponent: () => <svg data-testid='mock-menu-icon'></svg>,
  };
});

test('renders the Banner component with SVG icons', () => {
  render(<Banner />);

  // Check if the text and elements are present
  const titleElement = screen.getByText('CAPSULES');
  const descriptionElement = screen.getByText('View capsules data');

  // Assert that the SVG icons are present
  const menuIcon = screen.getByTestId('mock-menu-icon');
  const SpaceXIcon = screen.getByTestId('mock-spacex-icon');

  expect(menuIcon).toBeInTheDocument();
  expect(SpaceXIcon).toBeInTheDocument();

  // Check if the title and description text are present
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
