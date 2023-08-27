import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DataGrid from '../components/DataGrid';

const mockStore = configureStore([]);

describe('DataGrid Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      capsules: {
        data: [], // Initialize with empty data
        loading: true, // Simulate loading state
        currentPage: 1,
        itemsPerPage: 10,
      },
    });
  });

  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    // Modify the store to simulate an error
    store = mockStore({
      capsules: {
        data: [],
        loading: false,
        currentPage: 1,
        itemsPerPage: 10,
        error: 'Network response was not ok', // Simulate an error message
      },
    });

    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>,
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error: Network response was not ok')).toBeInTheDocument();
    });
  });

  test('renders data correctly', () => {
    const capsulesData = [
      {
        capsule_serial: '123',
        type: 'Crew Dragon',
        details: 'Some details',
        status: 'Active',
        landings: 2,
      },
    ];

    store = mockStore({
      capsules: {
        data: capsulesData,
        loading: false,
        currentPage: 1,
        itemsPerPage: 10, // Adjust as needed
      },
    });

    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>,
    );

    // Ensure that data is displayed correctly
    expect(screen.getByText('All Capsules')).toBeInTheDocument();
    expect(screen.getByText('Crew Dragon')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Some details')).toBeInTheDocument();
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
    expect(screen.getByText('Landings: 2')).toBeInTheDocument();
  });

  test('handles pagination correctly', () => {
    const capsulesData = [
      {
        capsule_serial: '123',
        type: 'Crew Dragon',
        details: 'Some details',
        status: 'Active',
        landings: 2,
      },
      {
        capsule_serial: '123',
        type: 'Crew Dragon',
        details: 'Some details',
        status: 'Active',
        landings: 2,
      },
    ];

    store = mockStore({
      capsules: {
        data: capsulesData,
        loading: false,
        currentPage: 1,
        itemsPerPage: 1,
      },
    });

    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>,
    );

    // Initially, we are on the first page
    expect(screen.getByTestId('page-range')).toHaveTextContent('Page 1 of 2');

    // Go to the next page
    const nextPageButton = screen.getByRole('button', { name: 'Next Page' });
    fireEvent.click(nextPageButton);

    // Wait for the pageRange to update
    waitFor(() => {
      expect(screen.getByTestId('page-range')).toHaveTextContent('Page 2 of 2');
    });

    // Go back to the previous page
    const previousPageButton = screen.getByRole('button', { name: 'Previous Page' });
    fireEvent.click(previousPageButton);

    // Wait for the pageRange to update
    waitFor(() => {
      expect(screen.getByTestId('page-range')).toHaveTextContent('Page 1 of 2');
    });
  });
});
