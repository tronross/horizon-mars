import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '@/lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

interface HealthAndSafetyStageProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export default function HealthAndSafetyStage({ register, errors }: HealthAndSafetyStageProps) {
  return (
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
  )
}