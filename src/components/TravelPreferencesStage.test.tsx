import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TravelPreferencesStage from './TravelPreferencesStage';

// Define mock props
const mockRegister = jest.fn();

describe('TravelPreferencesStage', () => {
  const errors = {};
  const launchPads = ['Launch Pad 1', 'Launch Pad 2'];
  const marsLodgings = ['Lodging 1', 'Lodging 2'];

  beforeEach(() => {
    render(
      <TravelPreferencesStage
        register={mockRegister}
        errors={errors}
        launchPads={launchPads}
        marsLodgings={marsLodgings}
      />
    );
  });

  it('renders the title', () => {
    expect(screen.getByText('Travel Preferences')).toBeInTheDocument();
  });

  it('renders the departure date input', () => {
    expect(screen.getByLabelText('Launch Date')).toBeInTheDocument();
  });

  it('renders the return date input', () => {
    expect(screen.getByLabelText('Return Date')).toBeInTheDocument();
  });

  it('renders the departure hub select', () => {
    expect(screen.getByLabelText('Launch Pad')).toBeInTheDocument();
  });

  it('renders the martian lodgings select', () => {
    expect(screen.getByLabelText('Martian Lodgings')).toBeInTheDocument();
  });

  it('renders the additional notes textarea', () => {
    expect(screen.getByLabelText('Additional Notes')).toBeInTheDocument();
  });

  it('calls register with the correct arguments for departure date', () => {
    expect(mockRegister).toHaveBeenCalledWith('departureDate');
  });

  it('calls register with the correct arguments for return date', () => {
    expect(mockRegister).toHaveBeenCalledWith('returnDate');
  });

  it('calls register with the correct arguments for departure hub', () => {
    expect(mockRegister).toHaveBeenCalledWith('departureHub');
  });

  it('calls register with the correct arguments for martian lodgings', () => {
    expect(mockRegister).toHaveBeenCalledWith('martianLodgings');
  });

  it('calls register with the correct arguments for additional notes', () => {
    expect(mockRegister).toHaveBeenCalledWith('additionalNotes');
  });

  it('displays error messages when errors are present', () => {
    const errors = {
      departureDate: { type: 'validate', message: 'Departure date error' },
      returnDate: { type: 'validate', message: 'Return date error' },
      departureHub: { type: 'validate', message: 'Departure hub error' },
      martianLodgings: { type: 'validate', message: 'Martian lodgings error' },
      additionalNotes: { type: 'validate', message: 'Additional notes error' },
    };

    render(
      <TravelPreferencesStage
        register={mockRegister}
        errors={errors}
        launchPads={launchPads}
        marsLodgings={marsLodgings}
      />
    );

    expect(screen.getByText('Departure date error')).toBeInTheDocument();
    expect(screen.getByText('Return date error')).toBeInTheDocument();
    expect(screen.getByText('Departure hub error')).toBeInTheDocument();
    expect(screen.getByText('Martian lodgings error')).toBeInTheDocument();
    expect(screen.getByText('Additional notes error')).toBeInTheDocument();
  });
});