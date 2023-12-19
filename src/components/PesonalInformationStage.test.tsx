import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '../lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

import PersonalInformationStage from './PersonalInformationStage';

// Define mock props
const mockRegister = jest.fn();

describe('PersonalInformationStage', () => {
  const errors = {};

  beforeEach(() => {
    render(
      <PersonalInformationStage
        register={mockRegister}
        errors={errors}
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
});