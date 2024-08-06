import { Controller } from 'react-hook-form';

export function AppInputField({
  rules,
  disabled,
  placeholder,
  type,
  control,
  name,
  errors,
  defaultValue,
}) {
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
              className="w-full rounded bg-bg--primary-200 px-4 py-[10px] pr-14 outline 
              outline-1 outline-border-2 focus:outline-2 focus:outline-blue-500"
              type={type || 'text'}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
              placeholder={placeholder}
            ></input>
          )}
        ></Controller>
      </div>
      {errors && <p className="absolute -bottom-5 pl-1 text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}
