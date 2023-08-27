import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import SearchForm from '../components/SearchForm';

const mockStore = configureStore([]);

test('renders SearchForm component correctly', () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>,
  );

  // Check if the component renders properly
  const header = screen.getByText('Search for Capsules');
  const statusInput = screen.getByLabelText('Filter By Status');
  const dateInput = screen.getByLabelText('Filter by Original Launch Date');
  const typeInput = screen.getByLabelText('Filter by Type');
  const searchButton = screen.getByText('Search');
  const clearButton = screen.getByText('Clear Filters');

  expect(header).toBeInTheDocument();
  expect(statusInput).toBeInTheDocument();
  expect(dateInput).toBeInTheDocument();
  expect(typeInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});

test('handles input changes correctly', () => {
  const store = mockStore({});
  const { getByLabelText } = render(
    <Provider store={store}>
      <SearchForm />
    </Provider>,
  );

  // Simulate input changes
  const statusInput = getByLabelText('Filter By Status');
  const dateInput = getByLabelText('Filter by Original Launch Date');
  const typeInput = getByLabelText('Filter by Type');

  fireEvent.change(statusInput, { target: { value: 'active' } });
  fireEvent.change(dateInput, { target: { value: '2023-08-26' } });
  fireEvent.change(typeInput, { target: { value: 'crew' } });

  expect(statusInput.value).toBe('active');
  expect(dateInput.value).toBe('2023-08-26');
  expect(typeInput.value).toBe('crew');
});

test('dispatches filter action when search button is clicked', () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>,
  );

  // Simulate input changes
  const statusInput = screen.getByLabelText('Filter By Status');
  fireEvent.change(statusInput, { target: { value: 'active' } });

  // Click the search button
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  // Check if the filterCapsules action was dispatched with the correct payload
  const actions = store.getActions();
  expect(actions[0].type).toBe('capsules/filterCapsules');
  expect(actions[0].payload).toEqual({ status: 'active', original_launch: '', type: '' });
});

test('dispatches clear filters action when clear button is clicked', () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>,
  );

  // Simulate input changes
  const statusInput = screen.getByLabelText('Filter By Status');
  fireEvent.change(statusInput, { target: { value: 'active' } });

  // Click the clear button
  const clearButton = screen.getByText('Clear Filters');
  fireEvent.click(clearButton);

  // Check if the clearFilters action was dispatched
  const actions = store.getActions();
  expect(actions[0].type).toBe('capsules/clearFilters');
});
