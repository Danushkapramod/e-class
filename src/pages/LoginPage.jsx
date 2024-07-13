import { Form, useForm } from "react-hook-form";

import Button from "../ui/components/Button";
import { useLogin } from "../authentication/useLogin";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm();
  const { mutate: login, isPending } = useLogin();

  function onSubmit(loginData) {
    login(loginData, {
      onSettled: () => {
        setValue("email", ""), setValue("password", "");
      },
    });
  }

  return (
    <div
      className=" flex h-screen items-center
                justify-center text-slate-900 "
    >
      <Form
        className="w-[28rem] rounded-md bg-bg--primary-300 p-8 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      >
        <p className="  pb-6 text-center text-2xl font-medium">
          E-Class Log In
        </p>
        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="email">
            Email
          </label>
          <input
            className=" rounded border border-bg--primary-100
             bg-bg--primary-200 px-6  py-3    
             outline-slate-400 focus:outline"
            type="email"
            id="email"
            required
            disabled={isPending}
            placeholder="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className=" absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className=" relative mb-4 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="password">
            Password
          </label>
          <input
            className=" rounded border border-bg--primary-100
           bg-bg--primary-200 px-6  py-3  
           outline-slate-400 focus:outline"
            type="password"
            id="password"
            required
            disabled={isPending}
            placeholder="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="absolute -bottom-6 mt-px text-sm  text-yellow-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="  pr-2 text-right">
          <Link
            to="/forgot-password"
            className="text-bg--secondery-2 font-light  underline opacity-80"
          >
            Forgot your password?
          </Link>
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
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
