import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock child components
jest.mock('../components/Banner', () => () => <div data-testid='mock-banner'>Mock Banner</div>);
jest.mock('../components/SearchForm', () => () => (
  <div data-testid='mock-search-form'>Mock SearchForm</div>
));
jest.mock('../components/DataGrid', () => () => (
  <div data-testid='mock-data-grid'>Mock DataGrid</div>
));
jest.mock('../components/PopupModal', () => () => (
  <div data-testid='mock-popup-modal'>Mock PopupModal</div>
));

test('renders the App component with mocked child components', () => {
  render(<App />);

  // Check if the main content is present
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();

  // Check if the mocked child components are present
  const mockBannerElement = screen.getByTestId('mock-banner');
  const mockSearchFormElement = screen.getByTestId('mock-search-form');
  const mockDataGridElement = screen.getByTestId('mock-data-grid');
  const mockPopupModalElement = screen.getByTestId('mock-popup-modal');

  expect(mockBannerElement).toBeInTheDocument();
  expect(mockSearchFormElement).toBeInTheDocument();
  expect(mockDataGridElement).toBeInTheDocument();
  expect(mockPopupModalElement).toBeInTheDocument();
});
