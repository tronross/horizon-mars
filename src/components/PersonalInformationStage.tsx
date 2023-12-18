import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '@/lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

interface PersonalInformationStageProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export default function PersonalInformationStage({ register, errors }: PersonalInformationStageProps) {
  return (
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
    </>)
}
