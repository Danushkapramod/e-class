import { Form, useForm } from 'react-hook-form';
import Button from '../ui/components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useResetPassword } from '../authentication/useResetPassword';
import { InputField } from './InputField';

export default function ResetPasswordPage() {
  let [searchParams] = useSearchParams();
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const [params, setParams] = useState();
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
  } = useForm();

  useEffect(() => {
    setParams({
      token: searchParams.get('token'),
      email: searchParams.get('email'),
    });
  }, [searchParams]);

  async function onSubmit(loginData) {
    if (!params.token || !params.email) {
      throw new Error('Error: Invalid inputs!');
    }
    const data = {
      token: params.token,
      email: params.email,
      new_password: loginData.new_password,
    };
    resetPassword(data);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {!isSuccess ? (
        <Form
          className=" mx-2 w-[28rem] min-w-72 rounded px-8 py-10 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
          control={control}
        >
          <p className="  pb-8 text-center text-2xl font-medium">E-Class Recovey password</p>
          <div className=" space-y-6">
            <InputField
              errors={errors.new_password}
              name="new_password"
              type="password"
              label="New password"
              control={control}
              icon="password"
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              }}
            />

            <InputField
              errors={errors.confirmPassword}
              name="confirmPassword"
              type="password"
              label="Confirm password"
              control={control}
              icon="password"
              rules={{
                required: 'Confirm password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
                validate: (value) => {
                  return (
                    value === getValues('new_password') ||
                    'Password & confirmPassword should be same.'
                  );
                },
              }}
            />
          </div>

          <div className=" flex justify-end gap-2">
            <Button
              className="!mt-8 !w-full  !justify-center !rounded !py-3 !normal-case"
              disabled={isPending}
              spinner={isPending}
              type="primary"
            >
              Reset Password
            </Button>
          </div>
        </Form>
      ) : (
        <Step2 />
      )}
    </div>
  );
}

function Step2() {
  const navigate = useNavigate();

  return (
    <div className="  mx-2 w-[28rem] min-w-72 rounded px-8 py-24 text-center shadow-2xl">
      <span
        className=" material-symbols-outlined h-max  origin-top 
                     scale-[280%] pb-14 font-light text-blue-600"
      >
        task_alt
      </span>

      <p className=" pb-4 text-2xl">Password Changed</p>
      <p className=" pb-6 text-center align-middle">Your password has been changed successfully.</p>
      <Button
        onClick={() => navigate('/login')}
        type="primary"
        className=" !flex !w-full !justify-center !py-3 !normal-case"
      >
        Back o login
      </Button>
    </div>
  );
}
