/////////////////////////////
// MarsVisitorForm component
/////////////////////////////

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import HealthAndSafetyStage from './HealthAndSafetyStage';
import PersonalInformationStage from './PersonalInformationStage';
import TravelPreferencesStage from './TravelPreferencesStage';

import { formSchema } from '../lib/formSchema';

type Inputs = z.infer<typeof formSchema>;

// Form Stages
const stages = [
  {
    id: 'Stage 1',
    name: 'Personal Information',
    formFields: ['firstName', 'lastName', 'birthDate', 'nationality', 'email', 'phoneNumber']
  },
  {
    id: 'Stage 2',
    name: 'Travel Preferences',
    formFields: ['departureDate', 'returnDate', 'departureHub', 'martianLodgings', 'additionalNotes']
  },
  {
    id: 'Stage 3',
    name: 'Health and Safety',
    formFields: ['healthDeclaration', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactEmail', 'medicalConditions']
  },
  {
    id: 'Stage 4',
    name: 'Success Message',
    formFields: []
  }
];

const launchPads = ['Pacific Spaceport Complex – Alaska', 'Tanegashima Space Center - Japan', 'Kool Keith Cosmodrome - New York', 'Alcântara Launch Center - Brasil'];

const marsLodgings = ['Olympus Mons Biosphere', 'Valles Marineris Casino', 'Hellas Planitia Edge Base', 'Elysium Planitia Spa'];

// Component
export default function MarsVisitorForm() {
  // Navigation State
  const [currentStage, setCurrentStage] = useState(0);

  // React Hook Form Method destructuring
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
    trigger,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  // useEffect to re-initialize form after successful submission and success message
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentStage === 3) {
      timeoutId = setTimeout(() => {
        setCurrentStage(0);
      }, 8000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStage]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const result = formSchema.safeParse(data);

    if (!result.success) {
      // If validation fails, log the validation errors and return early
      console.error('Validation errors:', result.error.errors);
      return;
    }

    try {
      const response = await fetch('/api/marsVisitorForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Validation errors:', errorData.errors);
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      setCurrentStage(stage => stage + 1);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    // If validation fails, go to the first stage with an error and focus on the first field with an error (catches errors from both client-side and server-side validation)
    const validationErrors = Object.keys(errors);
    const firstStageWithError = stages.findIndex(stage => stage.formFields.some(field => validationErrors.includes(field)));
    setCurrentStage(firstStageWithError);
  };

  // Set FieldName type to be the keys of Inputs; allows for partial form validation via trigger() used in next() function, below.
  type FieldName = keyof Inputs;

  // Navigation Functions (onClick)
  const back = () => {
    if (currentStage > 0) {
      setCurrentStage(stage => stage - 1);
    }
  };

  const next = async () => {
    const formFields = stages[currentStage].formFields;
    const values = watch();

    // If we're at the second stage (index 1), ensure departureDate and returnDate are filled in
    if (currentStage === 1) {
      if (!values.departureDate || !values.returnDate) {
        return;
      }

      // Manually set the values of departureDate and returnDate before triggering the validation
      setValue('departureDate', values.departureDate);
      setValue('returnDate', values.returnDate);
    }

    // Additional validation: Ensure returnDate is after departureDate
    if (new Date(values.returnDate) <= new Date(values.departureDate)) {
      // Handle error: returnDate is not after departureDate
      setError('returnDate', { type: 'manual', message: 'Return Date must be after the Launch Date' });
      return;
    }

    const isValid = await trigger(formFields as FieldName[], { shouldFocus: true });

    if (isValid) {
      setCurrentStage(stage => stage + 1);
    }
  };

  // Render Component
  return (
    <section className="form-container flex flex-col items-center justify-center py-12 px-4 sm:px-0">
      <form className="container flex flex-col gap-y-2 max-w-screen-sm mx-auto" onSubmit={handleSubmit(onSubmit, onError)}>
        <h2 className="text-xl text-center">Mars Visitor Application</h2>
        {currentStage === 0 && (<PersonalInformationStage register={register} errors={errors} />)}

        {currentStage === 1 && (<TravelPreferencesStage register={register} errors={errors} launchPads={launchPads} marsLodgings={marsLodgings} />)}

        {currentStage === 2 && (<HealthAndSafetyStage register={register} errors={errors} />)}

        {currentStage === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center">Success!</h2>
            <p className="text-center text-xl">Your form has been submitted.</p>
            <p className="text-center text-xl">We&apos;ll be in touch soon for next steps.</p>

          </>
        )}
        {currentStage < 2 &&
          <span className="inline-flex">
            <button
              type="button"
              disabled={(currentStage < 1)}
              onClick={back}
              className="flex-grow bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded-l">
              Back
            </button>
            <button
              type="button"
              disabled={(currentStage === 2)}
              onClick={next}
              className="flex-grow bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded-r">
              Next
            </button>
          </span>
        }
        {currentStage === 2 && (
          <span className="inline-flex">
            <button
              type="button"
              disabled={(currentStage < 1)}
              onClick={back}
              className="flex-grow bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded-l">
              Back
            </button>
            <button type="submit" className="flex-grow bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded">Submit</button>
          </span>
        )}
      </form>
    </section>
  );
}