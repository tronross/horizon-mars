import { useState } from "react";
import { useForm, SubmitHandler, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/lib/formSchema";

type Inputs = z.infer<typeof formSchema>;

export default function MarsVisitorForm() {
  // State  
  const [ currentStage, setCurrentStage ] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    reset();
  }

  

  return (
    <section className="flex flex-col items-center justify-center max-h-screen py-12">
      <form className="flex flex-col gap-y-2 max-w-screen-sm" onSubmit={handleSubmit(onSubmit)}>
        {currentStage === 0 && (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="px-2 py-2 rounded text-black" />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
  
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="px-2 py-2 rounded text-black"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
  
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="px-2 py-2 rounded text-black"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </>
        )}
  
        <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded">Submit</button>
      </form>
    </section>
  );
        }