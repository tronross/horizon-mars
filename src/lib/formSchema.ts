//////////////////////////////////
// MarsVisitorForm - Form schema
//////////////////////////////////

import { z } from "zod";

// Regex for date and phone number validation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Form schema
export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.string()
    .regex(dateRegex, 'Birth date must be in the format yyyy-mm-dd')
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date')
    .transform((val) => new Date(val)),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  departureDate: z.string()
    .regex(dateRegex, 'Launch date must be in the format yyyy-mm-dd')
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date')
    .transform((val) => new Date(val)),
    returnDate: z.string()
    .regex(dateRegex, 'Launch date must be in the format yyyy-mm-dd')
    .refine(dateString => !isNaN(Date.parse(dateString)), 'Invalid date')
    .transform((val) => new Date(val)),
  departureHub: z.string().min(1, "Departure hub is required"),
  martianLodgings: z.string().min(1, "Martian Lodgings is required"),
  additionalNotes: z.string(),
});
