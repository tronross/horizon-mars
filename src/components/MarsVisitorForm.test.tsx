import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import MarsVisitorForm from './MarsVisitorForm';

import nodeFetch from 'cross-fetch';
(global.fetch as any) = nodeFetch;

describe('MarsVisitorForm', () => {
  it('renders the Personal Information stage initially', () => {
    const { getByText } = render(<MarsVisitorForm />);
    expect(getByText('Personal Information')).toBeInTheDocument();
  });

  it('navigates to the next stage when the Next button is clicked', async () => {
    const { getByText, getByLabelText } = render(<MarsVisitorForm />);

    // Simulate user input for the 'Personal Information' stage's form fields
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(getByLabelText('Nationality'), { target: { value: 'American' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Phone number'), { target: { value: '1234567890' } });

    await act(async () => {
      fireEvent.click(getByText('Next'));
    });

    await waitFor(() => expect(getByText('Travel Preferences')).toBeInTheDocument());
  });

  it('navigates to the previous stage when the Back button is clicked', async () => {
    const { getByText, getByLabelText } = render(<MarsVisitorForm />);

    // Simulate user input for the 'Personal Information' stage's form fields
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Date of Birth'), { target: { value: '2000-01-01' } });
    fireEvent.change(getByLabelText('Nationality'), { target: { value: 'American' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Phone number'), { target: { value: '1234567890' } });

    await act(async () => {
      fireEvent.click(getByText('Next'));
    });

    await act(async () => {
      fireEvent.click(getByText('Back'));
    });

    await waitFor(() => expect(getByText('Personal Information')).toBeInTheDocument());
  });
});
