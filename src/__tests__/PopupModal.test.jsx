import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PopupModal from '../components/PopupModal';

const mockStore = configureStore([]);

test('does not render when isOpen is false', () => {
  const store = mockStore({
    selectedItem: {
      item: null,
      isOpen: false,
    },
  });

  render(
    <Provider store={store}>
      <PopupModal />
    </Provider>,
  );

  // Ensure that the modal is not rendered
  const modal = screen.queryByText('Capsule Details');
  expect(modal).toBeNull();
});

test('renders correctly when isOpen is true and selectedItem is provided', () => {
  const selectedItemData = {
    capsule_serial: '123',
    capsule_id: 'abc',
    status: 'Active',
    original_launch: '2022-01-01T00:00:00Z',
    missions: [
      { name: 'Mission 1', flight: 1 },
      { name: 'Mission 2', flight: 2 },
    ],
    landings: 2,
    type: 'Crew Dragon',
    details: 'Some details',
    reuse_count: 1,
  };

  const store = mockStore({
    selectedItem: {
      item: selectedItemData,
      isOpen: true,
    },
  });

  render(
    <Provider store={store}>
      <PopupModal />
    </Provider>,
  );

  // Ensure that the modal is rendered
  const modal = screen.getByText('Capsule Details');
  expect(modal).toBeInTheDocument();

  // Ensure that the modal displays the correct information
  expect(screen.getByText('Capsule Serial: 123')).toBeInTheDocument();
  expect(screen.getByText('Capsule Id: abc')).toBeInTheDocument();
  expect(screen.getByText('Capsule Status: Active')).toBeInTheDocument();
  expect(screen.getByText('Capsule Original Launch Date: Sat Jan 01 2022')).toBeInTheDocument();
  expect(screen.getByText('Mission name: Mission 1')).toBeInTheDocument();
  expect(screen.getByText('Mission Flight: 1')).toBeInTheDocument();
  expect(screen.getByText('Capsule Landings: 2')).toBeInTheDocument();
  expect(screen.getByText('Capsule Type: Crew Dragon')).toBeInTheDocument();
  expect(screen.getByText('Capsule details: Some details')).toBeInTheDocument();
  expect(screen.getByText('Capsule Reuse Count: 1')).toBeInTheDocument();
});

test('closes the modal when "Close" button is clicked', () => {
  const store = mockStore({
    selectedItem: {
      item: {
        capsule_serial: '123',
        type: 'Crew Dragon',
        details: 'Some details',
        missions: [],
        status: 'Active',
        landings: 2,
      },
      isOpen: true,
    },
  });

  render(
    <Provider store={store}>
      <PopupModal />
    </Provider>,
  );

  // Ensure that the modal is rendered
  const modal = screen.getByText('Capsule Details');
  expect(modal).toBeInTheDocument();

  // Find and click the "Close" button
  const closeButton = screen.getByRole('button', { name: 'Close Button' });
  fireEvent.click(closeButton);

  // Wait for the modal to disappear
  waitFor(() => {
    const closedModal = screen.queryByText('Capsule Details');
    expect(closedModal).not.toBeInTheDocument();
  });
});
