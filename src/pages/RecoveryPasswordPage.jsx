import { Form, useForm } from "react-hook-form";
import Button from "../ui/components/Button";
import { useNavigate } from "react-router-dom";
import { useRequestResetToken } from "../authentication/useRequestResetToken";

export default function RecoveryPasswordPage() {
  const { mutate, isPending } = useRequestResetToken();
  const navigate = useNavigate();
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
  } = useForm();
  async function onSubmit(formData) {
    mutate({ email: formData.email });
  }

  return (
    <div
      className="bg-dark-secondery flex h-screen items-center
                justify-center text-dark-text-primary"
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
            Email
          </label>
          <input
            className=" rounded border border-slate-600
             bg-white/20 px-6  py-3    
             outline-slate-400 focus:outline"
            type="email"
            id="email"
            required
            disabled={""}
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
        <div className=" flex justify-end gap-2 pt-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            disabled={isPending}
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
