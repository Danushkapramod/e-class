import { Form, useForm } from "react-hook-form";
import Button from "../ui/components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useResetPassword } from "../authentication/useResetPassword";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useResetPassword();
  const [params, setParams] = useState();
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    getValues,
  } = useForm();

  useEffect(() => {
    setParams({
      token: searchParams.get("token"),
      email: searchParams.get("email"),
    });
  }, [searchParams]);

  async function onSubmit(loginData) {
    if (!params.token || !params.email) {
      throw new Error("Error: Invalid inputs!");
    }
    const data = {
      token: params.token,
      email: params.email,
      new_password: loginData.new_password,
    };
    resetPassword(data);
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
          E-Class Recovey password
        </p>
        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="email">
            New password
          </label>
          <input
            className=" rounded border border-slate-600
             bg-white/20 px-6  py-3    
             outline-slate-400 focus:outline"
            type="password"
            id="new_password"
            required
            disabled={""}
            placeholder="new password"
            {...register("new_password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.new_password && (
            <p className=" absolute -bottom-6 mt-px text-sm  text-red-500">
              {errors.new_password.message}
            </p>
          )}
        </div>

        <div className=" relative mb-6 flex flex-col">
          <label className=" pl-px text-sm opacity-80 " htmlFor="email">
            Confirm password
          </label>
          <input
            className=" rounded border border-slate-600
             bg-white/20 px-6  py-3    
             outline-slate-400 focus:outline"
            type="password"
            id="confirm_password"
            required
            disabled={""}
            placeholder="confirm password"
            {...register("confirm_password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              validate: (value) => {
                return (
                  value === getValues("new_password") ||
                  "New password & confirmPassword should be same."
                );
              },
            })}
          />
          {errors.confirm_password && (
            <p className=" absolute -bottom-6 mt-px text-sm  text-red-500">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
        <div className=" flex justify-end gap-2 pt-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            disabled={isResettingPassword}
            type="secondery"
          >
            Close
          </Button>
          <Button
            disabled={isResettingPassword}
            spinner={isResettingPassword}
            type="primary"
          >
            submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
