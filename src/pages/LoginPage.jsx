import { Form, useForm } from 'react-hook-form';
import Button from '../ui/components/Button';
import { useLogin } from '../authentication/useLogin';
import { Link } from 'react-router-dom';
import { InputField } from './InputField';

export default function LoginPage() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm();
  const { mutate: login, isPending } = useLogin();

  function onSubmit(loginData) {
    login(loginData, {
      onSettled: () => {
        setValue('email', ''), setValue('password', '');
      },
    });
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Form
        className=" mx-2 w-[28rem] min-w-72 rounded px-8  py-12 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      >
        <p className=" pb-8 text-center text-2xl font-medium">EduSuit</p>

        <div className=" space-y-8">
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
            }}
          />
        </div>
        <div className="mt-4 w-full pr-2 text-right  text-blue-600 underline ">
          <Link to="/forgot-password"> Forgot your password?</Link>
        </div>

        <div className=" flex justify-end gap-2 pt-4">
          <Button
            className="!w-full !justify-center !rounded !py-3"
            disabled={isPending}
            spinner={isPending}
            type="primary"
          >
            Login
          </Button>
        </div>

        <div className=" mt-4 text-center">
          Dont, have an account?
          <Link className="pl-2 text-blue-600 " to="/signup">
            SignUp
          </Link>
        </div>
      </Form>
    </div>
  );
}
