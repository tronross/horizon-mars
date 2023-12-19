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

