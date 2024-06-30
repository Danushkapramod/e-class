import { Form, useForm } from "react-hook-form";

import Button from "../ui/components/Button";
import { useNavigate } from "react-router-dom";
import useSignup from "../authentication/useSignup";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
  } = useForm();
  const { mutate: signup, isPending } = useSignup();

  function onSubmit(loginData) {
    signup(loginData, {
      onSettled: () => {
        setValue("email", ""),
          setValue("password", ""),
          setValue("confirmPassword", "");
      },
    });
  }

  return (
    <div
      className="flex h-screen items-center justify-center
                bg-dark-secondery text-dark-text-primary"
    >
      <Form
        className="w-[28rem] rounded-lg  border border-slate-700 bg-dark-primary p-8"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      >
        <p className="  pb-6 text-center text-2xl font-medium">
          E-Class Sign Up
        </p>
        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="email">
            Name
          </label>
          <input
            className=" rounded border border-slate-600
             bg-white/20 px-6  py-3    
             outline-slate-400 focus:outline"
            type="text"
            id="name"
            required
            disabled={isPending}
            placeholder="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className=" absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="email">
            Email
          </label>
          <input
            className=" rounded border border-slate-600
             bg-white/20 px-6  py-3    
             outline-slate-400 focus:outline"
            type="email"
            id="email"
            required
            disabled={isPending}
            placeholder="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className=" absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="password">
            Password
          </label>
          <input
            className=" rounded border border-slate-600
           bg-white/20 px-6  py-3  
           outline-slate-400 focus:outline"
            type="password"
            id="password"
            required
            disabled={isPending}
            placeholder="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className=" relative mb-4 flex flex-col">
          <label
            className=" pl-px text-sm opacity-80 "
            htmlFor="confirmPassword"
          >
            confirm password
          </label>
          <input
            className=" rounded border border-slate-600
           bg-white/20 px-6  py-3  
           outline-slate-400 focus:outline"
            type="password"
            id="confirmPassword"
            required
            disabled={isPending}
            placeholder="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              validate: (value) => {
                return (
                  value === getValues("password") ||
                  "Password & confirmPassword should be same."
                );
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className=" flex justify-end gap-2 pt-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            disabled={isPending}
            spinner={isPending}
            type="secondery"
          >
            Close
          </Button>
          <Button disabled={isPending} spinner={isPending} type="primary">
            signup
          </Button>
        </div>
      </Form>
    </div>
  );
}
