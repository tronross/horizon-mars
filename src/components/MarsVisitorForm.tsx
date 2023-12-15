/////////////////////////////
// MarsVisitorForm component
/////////////////////////////

import { useState } from "react";
import { useForm, SubmitHandler, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/lib/formSchema";

type Inputs = z.infer<typeof formSchema>;

const stages = [
  {
    id: 'Stage 1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'birthDate', 'nationality', 'email', 'phoneNumber']
  },
  {
    id: 'Stage 2',
    name: 'Travel Preferences',
    fields: []
  },
  {
    id: 'Stage 3',
    name: 'Health and Safety',
    fields: []
  },
  {
    id: 'Stage 4',
    name: 'Success Message',
    fields: []
  },
]

export default function MarsVisitorForm() {
  // Navigation State  
  const [currentStage, setCurrentStage] = useState(0);
  const [previousStage, setPreviousStage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('onSubmit called', data);
    reset();
  }



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
        {currentStage < 2 &&
          <span className="inline-flex">
            <button className="flex-grow bg-teal-500 hover:bg-teal-700 text-white text-white font-bold py-2 px-4 border border-teal-700 rounded-l">
              Prev
            </button>
            {currentStage < 1}
            <button className="flex-grow bg-teal-500 hover:bg-teal-700 text-white text-white font-bold py-2 px-4 border border-teal-700 rounded-r">
              Next
            </button>
          </span>
        }
        {/* {currentStage === 2 && ( */}
        <>

          <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded">Submit</button>
        </>
        {/* )} */}
      </form>
    </section>
  );
}