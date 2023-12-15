/////////////////////////////
// MarsVisitorForm component
/////////////////////////////

import { useState } from "react";
import { useForm, SubmitHandler, type FieldValues, FieldName } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/lib/formSchema";

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
    formFields: ['departureDate', 'returnDate', 'departureHub', 'martianLodgings', 'Additional Notes']
  },
  {
    id: 'Stage 3',
    name: 'Health and Safety',
    formFields: []
  },
  {
    id: 'Stage 4',
    name: 'Success Message',
    formFields: []
  },
]

const launchPads = ['Pacific Spaceport Complex – Alaska', 'Tanegashima Space Center', 'Kool Keith Launch Complex - New York', 'Alcântara Launch Center - Brasil'];

const marsLodgings = ['Olympus Mons Biosphere', 'Valles Marineris Casino', 'Hellas Planitia Edge Base', 'Elysium Planitia Spa'];



export default function MarsVisitorForm() {
  // Navigation State  
  const [currentStage, setCurrentStage] = useState(0);
  const [previousStage, setPreviousStage] = useState(0);

  // React Hook Form Method destructuring
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    getValues
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('onSubmit called', data);
    reset();
  }

  // Set FieldName type to be the keys of Inputs; allows for partial form validation via trigger() used in next() function, below.
  type FieldName = keyof Inputs;

  // Navigation Functions (onClick)
  const back = () => {
    if (currentStage > 0) {
      setPreviousStage(currentStage)
      setCurrentStage(stage => stage - 1)
    }
  }

  const next = async () => {
    const formFields = stages[currentStage].formFields;
    const isValid = await trigger(formFields as FieldName[], { shouldFocus: true });

    if (isValid) {
      setPreviousStage(currentStage)
      setCurrentStage(stage => stage + 1)
    }
  }

  // Render Component
  return (
    <section className="flex flex-col items-center justify-center max-h-screen py-12">
      <form className="flex flex-col gap-y-2 max-w-screen-sm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        {currentStage === 0 && (
          <>
            <h2 className="text-2xl font-bold text-center">Personal Information</h2>
            <label htmlFor="firstName">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className="px-2 py-2 rounded text-black" />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className="px-2 py-2 rounded text-black"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

            <label htmlFor="birthDate">Date of Birth</label>
            <input
              {...register("birthDate")}
              type="date"
              className="px-2 py-2 rounded text-black"
            />
            {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}

            <label htmlFor="nationality">Nationality</label>
            <input
              {...register("nationality")}
              type="text"
              className="px-2 py-2 rounded text-black"
            />
            {errors.nationality && <p className="text-red-500">{errors.nationality.message}</p>}

            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              className="px-2 py-2 rounded text-black"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label htmlFor="phoneNumber">Phone number</label>
            <input
              {...register("phoneNumber")}
              type="tel"
              className="px-2 py-2 rounded text-black"
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
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
              <option value="">Select a departure hub</option>
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
              className="px-2 py-4 rounded text-black"  />
          </>
        )}
        {currentStage < 4 &&
          <span className="inline-flex">
            <button
              type="button"
              disabled={(currentStage < 1)}
              onClick={back}
              className="flex-grow bg-teal-500 hover:bg-teal-700 text-white text-white font-bold py-2 px-4 border border-teal-700 rounded-l">
              Back
            </button>

            <button
              type="button"
              onClick={next}
              className="flex-grow bg-teal-500 hover:bg-teal-700 text-white text-white font-bold py-2 px-4 border border-teal-700 rounded-r">
              Next
            </button>
          </span>
        }
        {currentStage === 3 && (
          <>
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded">Submit</button>
          </>
        )}
      </form>
    </section>
  );
}