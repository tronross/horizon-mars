import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '../lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

import HealthAndSafetyStage from './HealthAndSafetyStage';

// Define mock props
const mockRegister = jest.fn();

describe('HealthAndSafetyStage', () => {
  let register: ReturnType<typeof useForm>['register'];
  let errors: Partial<Record<keyof Inputs, any>>;
  const mockErrors: Partial<Record<keyof Inputs, any>> = {
    healthDeclaration: { message: 'Health declaration error' },
    emergencyContactName: { message: 'Emergency contact name error' },
    emergencyContactEmail: { message: 'Emergency contact email error' },
    emergencyContactPhone: { message: 'Emergency contact phone error' },
    medicalConditions: { message: 'Medical conditions error' },
  };

  beforeEach(() => {
    register = jest.fn();
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
      healthDeclaration: { message: 'Health declaration error' },
      emergencyContactName: { message: 'Emergency contact name error' },
      emergencyContactEmail: { message: 'Emergency contact email error' },
      emergencyContactPhone: { message: 'Emergency contact phone error' },
      medicalConditions: { message: 'Medical conditions error' },
    };

    render(<HealthAndSafetyStage register={mockRegister} errors={errors} />);

    expect(screen.getByText('Health declaration error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact name error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact email error')).toBeInTheDocument();
    expect(screen.getByText('Emergency contact phone error')).toBeInTheDocument();
    expect(screen.getByText('Medical conditions error')).toBeInTheDocument();
  });
});
