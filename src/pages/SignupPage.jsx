import { Form, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../authentication/useSignup';
import { InputField } from './InputField';
import { useEffect, useState } from 'react';
import { Button } from '../ui/components/ButtonNew';

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutate: signup, isPending, isSuccess, error } = useSignup();
  const [window, setWondow] = useState(1);

  useEffect(() => {
    if (!isSuccess) setWondow(1);
    if (isSuccess) setWondow(2);
    if (error) setWondow(3);
  }, [error, isSuccess]);
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  function onSubmit(data) {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    signup(formData, {
      onSettled: () => {
        setValue('email', ''), setValue('password', ''), setValue('confirmPassword', '');
      },
    });
  }

  if (window === 1)
    return (
      <div className=" bg-dark-secondery flex h-screen items-center justify-center text-slate-700">
        <Form
          className="  mx-2 w-[28rem] min-w-72  rounded p-8 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
          control={control}
        >
          <p className="pb-8 text-center text-2xl font-semibold">Signup</p>
          <div className=" space-y-6">
            <InputField
              errors={errors.name}
              name="name"
              type="text"
              label="Name"
              control={control}
              icon="person"
              rules={{
                required: 'Name is required',
              }}
            />

            <InputField
              errors={errors.email}
              name="email"
              type="text"
              label="Email"
              control={control}
              icon="mail"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
            />
            <InputField
              errors={errors.password}
              name="password"
              type="password"
              label="Password"
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
                    value === getValues('password') || 'Password & confirmPassword should be same.'
                  );
                },
              }}
            />
          </div>

          <Button
            className="mt-8 h-12 w-full justify-center rounded"
            disabled={isPending}
            spinner={isPending}
            label="SIGNUP"
          />
          <div className=" mt-4 text-center">
            Already have an account?
            <Link className="pl-2 text-blue-600 " to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    );

  if (window === 2)
    return (
      <div className=" bg-dark-secondery flex h-screen items-center justify-center text-slate-700">
        <div className="  mx-2 w-[28rem] min-w-72 rounded px-8 py-24 text-center shadow-2xl">
          <span
            className=" material-symbols-outlined h-max  origin-top 
                     scale-[280%] pb-14 font-light text-blue-600"
          >
            add_task
          </span>

          <p className=" pb-4 text-xl">Your account has been successfully created</p>
          <p className=" pb-6 text-center align-middle">
            Thank you for signing up for EduSuit! Your account has been successfully created. To
            complete the setup and verify your email address, please check your inbox for further
            instructions. If you do not receive an email within a few minutes, please check your
            spam folder or contact our support team at edusuit.reply@gmail.com. Welcome aboard!
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="flex h-12 w-full justify-center"
            label="Back to login"
          />
        </div>
      </div>
    );

  if (window === 3)
    return (
      <div className=" bg-dark-secondery flex h-screen items-center justify-center text-slate-700">
        <div className="  mx-2 w-[28rem] min-w-72 rounded px-8 py-24 text-center shadow-2xl">
          <span
            className=" material-symbols-outlined h-max  origin-top 
                   scale-[280%] pb-14 font-light text-blue-600"
          >
            sentiment_dissatisfied
          </span>

          <p className=" pb-4 text-xl">Account Creation Unsuccessful</p>
          <p className=" pb-6 text-center align-middle">
            We regret to inform you that your attempt to create an account on EduSuit was
            unsuccessful. Unfortunately, we encountered an issue while processing your registration.
            If you need help or have any questions, feel free to reach out to us at
            edusuit.reply@gmail.com. Best regards, The EduSuit Team
          </p>
          <Button
            onClick={() => setWondow(1)}
            className="flex h-12 w-full justify-center"
            label="Try Again"
          />
        </div>
      </div>
    );
}
