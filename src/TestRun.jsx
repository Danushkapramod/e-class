import React from 'react';
import { useForm } from 'react-hook-form';

const FloatingLabelInput = ({ label, register, name, required, type = 'text' }) => {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        type={type}
        {...register(name, { required })}
        className="peer block w-full appearance-none border-0 border-b-2 
        border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900
         focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75
       transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 
       peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 
       peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};

const Appp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 w-full max-w-md">
      <FloatingLabelInput label="Username" register={register} name="username" required />
      <FloatingLabelInput
        label="Password"
        register={register}
        name="password"
        required
        type="password"
      />
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  );
};

export default Appp;
