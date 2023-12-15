import React from "react";
import { useForm, SubmitHandler, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1,"First name is required"),
  lastName: z.string().min(1,"Last name is required"),
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function MarsVisitorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-y-2 max-w-screen-sm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        {...register("firstName")}
        type="firstName"
        placeholder="First Name"
        className="px-2 py-2 rounded"
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        {...register("lastName")}
        type="lastName"
        placeholder="Last Name"
        className="px-2 py-2 rounded"
      />
      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-2 py-2 rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}