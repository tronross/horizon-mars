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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        {...register("firstName", { required: true })}
        type="text"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        {...register("lastName", { required: true })}
        type="text"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register("email", { required: true })}
        type="text"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}