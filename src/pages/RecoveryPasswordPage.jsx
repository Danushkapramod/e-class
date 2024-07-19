import { Form, useForm } from 'react-hook-form';
import Button from '../ui/components/Button';
import { useRequestResetToken } from '../authentication/useRequestResetToken';
import { InputField } from './InputField';
import { useState } from 'react';

export default function RecoveryPasswordPage() {
  const { mutate, isPending, isSuccess } = useRequestResetToken();
  const [email, setEmail] = useState();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  function onSubmit(formData) {
    setEmail(formData.email);
    mutate({ email: formData.email });
  }

  return (
    // <div className="flex h-screen items-center justify-center  text-slate-800">
    //   {!isSuccess ? (
    //     <Form
    //       className="w-[28rem] rounded p-8 shadow-2xl"
    //       onSubmit={handleSubmit(onSubmit)}
    //       control={control}
    //     >
    //       <p className="  pb-8 text-center  text-2xl font-medium">Reset Your Password</p>
    //       <div className=" relative flex flex-col">
    //         <InputField
    //           errors={errors.email}
    //           name="email"
    //           type="text"
    //           label="Email"
    //           control={control}
    //           icon="mail"
    //           rules={{
    //             required: 'Email is required',
    //             pattern: {
    //               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    //               message: 'Invalid email address',
    //             },
    //           }}
    //         />
    //       </div>

    //       <Button
    //         className="!mt-8 !w-full !justify-center !rounded !py-3 !normal-case"
    //         disabled={isPending}
    //         spinner={isPending}
    //         type="primary"
    //       >
    //         Send Reset Email
    //       </Button>
    //     </Form>
    //   ) : (
    //     <Step2 email={email} />
    //   )}
    // </div>
    <Step3 />
  );
}

function Step2({ email }) {
  const { mutate, isPending } = useRequestResetToken();

  return (
    <div className=" w-[28rem] rounded px-8 py-24 text-center shadow-2xl">
      <span
        className=" material-symbols-outlined h-max  origin-top 
                     scale-[280%] pb-14 font-light text-blue-600"
      >
        mark_email_read
      </span>

      <p className=" pb-4 text-2xl">Check your email</p>
      <p className=" pb-6 text-center align-middle">
        Please check the email address {email} for instructions to reset your password.
      </p>
      <Button
        spinner={isPending}
        disabled={isPending}
        sp_color="#2563eb"
        onClick={() => mutate({ email })}
        type="secondery"
        className=" !flex !w-full !justify-center
            !border-slate-200 !bg-blue-50 !py-3 !normal-case  hover:!bg-blue-100"
      >
        Resend Email
      </Button>
    </div>
  );
}

function Step3({ email }) {
  return (
    <div className="flex w-[700px] flex-col bg-slate-100">
      <div className="flex h-20 w-full items-center justify-center bg-slate-700">
        <p className=" text-3xl font-medium text-slate-200">EduSuit</p>
      </div>
      <div className="w-full p-8 ">
        <p className=" pb-4 text-xl font-bold ">Hi Danushka pramod</p>
        <p> Thank you for signing up. Please verify your email by clicking the link below</p>
        <div className=" flex justify-center">
          <button className=" mt-6 max-w-60 grow rounded bg-blue-500 px-6  py-3 text-slate-100 ">
            Verify Email
          </button>
        </div>
        <p className=" mt-12">
          If you have any issue confirming your email we will be happy to help you. You can contact
          us on : <span className="text-red-600">edusuit.reply@gmail.com</span>
        </p>

        <p className=" mt-8">Regards,</p>
        <p>The EduSuit Team</p>
      </div>
      <div className="flex h-20 w-full items-center justify-center bg-slate-700">
        <p className=" text-3xl font-medium text-slate-200"></p>
      </div>
    </div>
  );
}
