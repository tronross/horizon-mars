import { formSchema } from './formSchema';

describe('formSchema', () => {
  it('should validate a correct form', () => {
    const validForm = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      nationality: 'American',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      departureDate: '2025-01-01',
      returnDate: '2027-12-31',
      departureHub: 'Mars',
      martianLodgings: 'Hotel',
      additionalNotes: 'None',
      healthDeclaration: true,
      emergencyContactName: 'Jane Doe',
      emergencyContactEmail: 'jane.doe@example.com',
      emergencyContactPhone: '+0987654321',
      medicalConditions: 'None',
    };

    const result = formSchema.safeParse(validForm);

    expect(result.success).toBe(true);
  });

  it('should invalidate an incorrect form', () => {
    const invalidForm = {
      firstName: '', // First name is required
      lastName: '', // Last name is required
      birthDate: 'invalid-date', // Invalid date
      nationality: '', // Nationality is required
      email: 'invalid-email', // Invalid email
      phoneNumber: 'invalid-phone-number', // Invalid phone number
      departureDate: 'invalid-date', // Invalid date
      returnDate: 'invalid-date', // Invalid date
      departureHub: '', // Departure Hub is required
      martianLodgings: '', // Martian Lodgings is required
      additionalNotes: 'None',
      healthDeclaration: false, // You must Affirm to continue
      emergencyContactName: 'Ja', // Name of Emergency Contact is required
      emergencyContactEmail: 'invalid-email', // Invalid email
      emergencyContactPhone: 'invalid-phone-number', // Invalid phone number
      medicalConditions: 'None',
    };

    const result = formSchema.safeParse(invalidForm);

    expect(result.success).toBe(false);
  });
});