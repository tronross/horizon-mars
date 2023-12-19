import * as React from 'react';
import { render, screen } from '@testing-library/react';
import HealthAndSafetyStage from './HealthAndSafetyStage';

// Define mock props
const mockRegister = jest.fn ();
const mockErrors = jest.fn ();

describe ('HealthAndSafetyStage', () => {
  it ('renders the HealthAndSafetyStage component', () => {
    render (<HealthAndSafetyStage errors={mockErrors} register={mockRegister} />);

    screen.debug ();
  }
  );
}
);

