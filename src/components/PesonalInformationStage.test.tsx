import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PersonalInformationStage from './PersonalInformationStage';

// Define mock props
const mockRegister = jest.fn();

describe('PersonalInformationStage', () => {
  const mockErrors = {
    firstName: { type: 'required', message: 'First name error' },
    lastName: { type: 'required', message: 'Last name error' },
    birthDate: { type: 'required', message: 'Birth date error' },
    nationality: { type: 'required', message: 'Nationality error' },
    email: { type: 'required', message: 'Email error' },
    phoneNumber: { type: 'required', message: 'Phone number error' },
  };

  beforeEach(() => {
    render(
      <PersonalInformationStage
        register={mockRegister}
        errors={mockErrors}
      />
    );
  });

  it('renders the title', () => {
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders the first name input', () => {
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  });

  it('renders the last name input', () => {
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('renders the date of birth input', () => {
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
  });

  it('renders the nationality input', () => {
    expect(screen.getByLabelText('Nationality')).toBeInTheDocument();
  });

  it('renders the email input', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders the phone number input', () => {
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
  });
  it('calls register with the correct arguments for first name', () => {
    expect(mockRegister).toHaveBeenCalledWith('firstName');
  });
  
  it('calls register with the correct arguments for last name', () => {
    expect(mockRegister).toHaveBeenCalledWith('lastName');
  });
  
  it('calls register with the correct arguments for date of birth', () => {
    expect(mockRegister).toHaveBeenCalledWith('birthDate');
  });
  
  it('calls register with the correct arguments for nationality', () => {
    expect(mockRegister).toHaveBeenCalledWith('nationality');
  });
  
  it('calls register with the correct arguments for email', () => {
    expect(mockRegister).toHaveBeenCalledWith('email');
  });
  
  it('calls register with the correct arguments for phone number', () => {
    expect(mockRegister).toHaveBeenCalledWith('phoneNumber');
  });
  it('displays the first name error', () => {
    expect(screen.getByText('First name error')).toBeInTheDocument();
  });

  it('displays the last name error', () => {
    expect(screen.getByText('Last name error')).toBeInTheDocument();
  });

  it('displays the birth date error', () => {
    expect(screen.getByText('Birth date error')).toBeInTheDocument();
  });

  it('displays the nationality error', () => {
    expect(screen.getByText('Nationality error')).toBeInTheDocument();
  });

  it('displays the email error', () => {
    expect(screen.getByText('Email error')).toBeInTheDocument();
  });

  it('displays the phone number error', () => {
    expect(screen.getByText('Phone number error')).toBeInTheDocument();
  });
});