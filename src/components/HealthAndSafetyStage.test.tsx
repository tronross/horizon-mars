import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '../lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

import HealthAndSafetyStage from './HealthAndSafetyStage';

// Define mock props
const mockRegister = jest.fn();

type ErrorRecord = Partial<Record<keyof Inputs, FieldError>>;

describe('HealthAndSafetyStage', () => {
  let errors: ErrorRecord;
  const mockErrors: ErrorRecord = {
    healthDeclaration: { type: 'required', message: 'Health declaration error' },
    emergencyContactName: { type: 'required', message: 'Emergency contact name error' },
    emergencyContactEmail: { type: 'required', message: 'Emergency contact email error' },
    emergencyContactPhone: { type: 'required', message: 'Emergency contact phone error' },
    medicalConditions: { type: 'required', message: 'Medical conditions error' },
  };

  beforeEach(() => {
    errors = {};
  });

  it('renders the HealthAndSafetyStage component', () => {
    render(<HealthAndSafetyStage errors={mockErrors} register={mockRegister} />);

    expect(screen.getByText('Health and Safety')).toBeInTheDocument();
    expect(screen.getByLabelText('Affirmative')).toBeInTheDocument();
    expect(screen.getByLabelText('Name of Emergency Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('Emergency Contact Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Emergency Contact Phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('Medical Conditions')).toBeInTheDocument();
  });

  it('displays error messages when errors are present', () => {
    errors = {
      healthDeclaration: { type: 'required', message: 'Health declaration error' },
      emergencyContactName: { type: 'required', message: 'Emergency contact name error' },
      emergencyContactEmail: { type: 'required', message: 'Emergency contact email error' },
      emergencyContactPhone: { type: 'required', message: 'Emergency contact phone error' },
      medicalConditions: { type: 'required', message: 'Medical conditions error' },
    };
    
    render(<HealthAndSafetyStage register={mockRegister} errors={errors} />);

    expect(screen.getByText('Health declaration error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact name error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact email error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact phone error')).toBeInTheDocument();
    expect(screen.getByText('Medical conditions error')).toBeInTheDocument();
  });
});
