import { Controller } from 'react-hook-form';

export function AppInputField({ rules, placeholder, type, control, name, errors }) {
  return (
    <div className=" relative flex w-full flex-col">
      <div className="group relative z-0 flex w-full items-center">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              {...field}
              className="outline-border-2 w-full
              rounded bg-bg--primary-200 px-4  py-[10px] pr-14
              outline outline-1 focus:outline-2 focus:outline-blue-500"
              type={type || 'text'}
              name={name}
              placeholder={placeholder}
            ></input>
          )}
        ></Controller>
      </div>
      {errors && <p className="absolute -bottom-5  pl-1 text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}
