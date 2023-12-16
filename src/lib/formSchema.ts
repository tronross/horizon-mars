//////////////////////////////////
// MarsVisitorForm - Form schema
//////////////////////////////////

import { z } from 'zod';

// Regex for date and phone number validation
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Form schema - Error Messages also serve as explanatory comments for the schema
export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthDate: z.string()
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date')
    .refine(dateString => new Date(dateString) < new Date(), 'Birth date must be in the past'),
  nationality: z.string().min(1, 'Nationality is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
  departureDate: z.string()
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date')
    .refine(dateString => new Date(dateString) > new Date(), 'Launch Date must be in the future'),
  returnDate: z.string()
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date'),
  departureHub: z.string().min(1, 'Departure Hub is required'),
  martianLodgings: z.string().min(1, 'Martian Lodgings is required'),
  additionalNotes: z.string().optional(),
  healthDeclaration: z.boolean().optional().default(false).refine(val => val, 'You must Affirm to continue'),
  emergencyContactName: z.string().min(3, 'Name of Emergency Contact is required'),
  emergencyContactEmail: z.string().email('Please enter a valid email address'),
  emergencyContactPhone: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
  medicalConditions: z.string().optional(),
}).refine( // Date comparison needs access to the whole object
  ({ departureDate, returnDate }) => {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    const fourWeeksAfterDeparture = new Date(departure);
    fourWeeksAfterDeparture.setDate(fourWeeksAfterDeparture.getDate() + 28);
    return returnD >= fourWeeksAfterDeparture;
  },
  { message: 'Return Date must be at least 4 weeks after the Launch Date', path: ['returnDate'] }
);