/////////////////////////////
// MarsVisitorForm component
/////////////////////////////

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema } from '@/lib/formSchema';

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
    name: 'Success Message'
  }
]

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
    console.log('onSubmit called', data);

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
      console.log('Response data:', responseData);

      setCurrentStage(stage => stage + 1);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    console.log('form is invalid', errors);
  };

  // Set FieldName type to be the keys of Inputs; allows for partial form validation via trigger() used in next() function, below.
  type FieldName = keyof Inputs;

  // Navigation Functions (onClick)
  const back = () => {
    if (currentStage > 0) {
      setCurrentStage(stage => stage - 1)
    }
  }

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
      setCurrentStage(stage => stage + 1)
    }
  }

  // Render Component
  return (
    <section className="form-container flex flex-col items-center justify-center py-12 px-4 sm:px-0">
      <form className="container flex flex-col gap-y-2 max-w-screen-sm mx-auto" onSubmit={handleSubmit(onSubmit, onError)}>


        {currentStage === 0 && (
          <>
            <h2 className="text-2xl font-bold text-center max-w-screen-sm">Personal Information</h2>
            <label className="max-w-screen-sm" htmlFor="firstName">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className="px-2 py-2 rounded text-black w-full" />
            {errors.firstName && <p className="text-red-500 max-w-screen-sm">{errors.firstName.message}</p>}

            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className="px-2 py-2 rounded text-black w-full"
            />
            {errors.lastName && <p className="text-red-500 max-w-screen-sm">{errors.lastName.message}</p>}

            <label htmlFor="birthDate">Date of Birth</label>
            <input
              {...register("birthDate")}
              type="date"
              className="px-2 py-2 rounded text-black w-full"
            />
            {errors.birthDate && <p className="text-red-500 max-w-screen-sm">{errors.birthDate.message}</p>}

            <label htmlFor="nationality">Nationality</label>
            <input
              {...register("nationality")}
              type="text"
              className="px-2 py-2 rounded text-black w-full"
            />
            {errors.nationality && <p className="text-red-500 max-w-screen-sm">{errors.nationality.message}</p>}

            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              className="px-2 py-2 rounded text-black w-full"
            />
            {errors.email && <p className="text-red-500 max-w-screen-sm">{errors.email.message}</p>}

            <label htmlFor="phoneNumber">Phone number</label>
            <input
              {...register("phoneNumber")}
              type="tel"
              className="px-2 py-2 rounded text-black w-full"
            />
            {errors.phoneNumber && <p className="text-red-500 max-w-screen-sm">{errors.phoneNumber.message}</p>}
          </>
        )}
        {currentStage === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center">Travel Preferences</h2>
            <label htmlFor="departureDate">Launch Date</label>
            <input
              {...register("departureDate")}
              type="date"
              className="px-2 py-2 rounded text-black" />
            {errors.departureDate && <p className="text-red-500">{errors.departureDate.message}</p>}
            <label htmlFor="returnDate">Return Date</label>
            <input
              {...register("returnDate")}
              type="date"
              className="px-2 py-2 rounded text-black" />
            {errors.returnDate && <p className="text-red-500">{errors.returnDate.message}</p>}
            <label htmlFor="departureHub">Launch Pad</label>
            <select {...register("departureHub")} className="px-2 py-2 rounded text-black">
              <option value="">Select a Departure Hub</option>
              {launchPads.map((launchPad, index) => (
                <option key={index} value={launchPad}>
                  {launchPad}
                </option>
              ))}
            </select>
            {errors.departureHub && <p className="text-red-500">{errors.departureHub.message}</p>}
            <label htmlFor="martianLodgings">Martian Lodgings</label>
            <select {...register("martianLodgings")} className="px-2 py-2 rounded text-black">
              <option value="">Select your Martian Lodgings</option>
              {marsLodgings.map((marsLodging, index) => (
                <option key={index} value={marsLodging}>
                  {marsLodging}
                </option>
              ))}
            </select>
            {errors.martianLodgings && <p className="text-red-500">{errors.martianLodgings.message}</p>}
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              {...register("additionalNotes")}
              className="px-2 py-4 rounded text-black" />
            {errors.additionalNotes && <p className="text-red-500">{errors.additionalNotes.message}</p>}

          </>
        )}
        {currentStage === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center">Health and Safety</h2>
            <label htmlFor="Health Declaration">Health Declaration</label>
            <p className="font-bold">I hereby declare that I have been approved for spaceflight by a board-certified Doctor. I will provide the physicians pre-flight report upon confirmation of my trip.</p>
            <label htmlFor="healthDeclaration">
              <input
                type="checkbox"
                className="px-2 py-2 rounded text-black"
                {...register("healthDeclaration")}
              />  Affirmative</label>
            {errors.healthDeclaration && <p className="text-red-500">{errors.healthDeclaration.message}</p>}
            <label htmlFor="emergencyContactName">Name of Emergency Contact</label>
            <input
              {...register("emergencyContactName")}
              type="text"
              className="px-2 py-2 rounded text-black" />
            {errors.emergencyContactName && <p className="text-red-500">{errors.emergencyContactName.message}</p>}
            <label htmlFor="emergencyContactEmail">Emergency Contact Email</label>
            <input
              {...register("emergencyContactEmail")}
              type="email"
              className="px-2 py-2 rounded text-black"
            />
            {errors.emergencyContactEmail && <p className="text-red-500">{errors.emergencyContactEmail.message}</p>}

            <label htmlFor="emergencyContactPhone">Emergency Contact Phone number</label>
            <input
              {...register("emergencyContactPhone")}
              type="tel"
              className="px-2 py-2 rounded text-black"
            />
            {errors.emergencyContactPhone && <p className="text-red-500">{errors.emergencyContactPhone.message}</p>}
            <label htmlFor="medicalConditions">Medical Conditions</label>
            <p>Please tell us about any medical conditions you have.</p>
            <textarea
              {...register("medicalConditions")}
              className="px-2 py-4 rounded text-black" />
            {errors.medicalConditions && <p className="text-red-500">{errors.medicalConditions.message}</p>}
          </>
        )}
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