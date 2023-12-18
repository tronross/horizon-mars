import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { formSchema } from '@/lib/formSchema';
type Inputs = z.infer<typeof formSchema>;

interface PersonalInformationStageProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  launchPads: string[];
  marsLodgings: string[];
}

export default function PersonalInformationStage({ register, errors, launchPads, marsLodgings }: PersonalInformationStageProps) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center">Travel Preferences</h2>
      <label htmlFor="departureDate">Launch Date</label>
      <p>Please book at least 48hrs in advance of your flight.</p>
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
  )
}
