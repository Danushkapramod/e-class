import { Form, useForm } from 'react-hook-form';

import Button from '../ui/components/Button';
import { Link } from 'react-router-dom';
import useSignup from '../authentication/useSignup';
import { InputField } from './InputField';

export default function SignupPage() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  const { mutate: signup, isPending } = useSignup();

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

  return (
    <div className=" bg-dark-secondery flex h-screen items-center justify-center text-slate-700">
      <Form
        className=" w-[28rem]  rounded p-8 shadow-2xl"
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
          className="!mt-8 !w-full !justify-center !rounded !py-3"
          disabled={isPending}
          spinner={isPending}
          type="primary"
        >
          signup
        </Button>

        <div className=" mt-4 text-center">
          Already have an account?
          <Link className="pl-2 text-blue-600 " to="/login">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}
