import { useState } from 'react';
import { Controller } from 'react-hook-form';

export function InputField({ label, rules, control, name, type, errors, icon }) {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className=" relative flex flex-col">
      <div className="group relative z-0 flex w-full items-center">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              {...field}
              type={!visibility ? type : 'text'}
              name={name}
              placeholder=""
              className="peer block w-full appearance-none rounded border border-gray-400 bg-transparent px-6 
                py-3 pl-12  text-gray-900  outline-blue-500 focus:border-blue-600 focus:outline-2"
            />
          )}
        ></Controller>

        <div
          className="material-symbols-outlined absolute left-4  select-none
         font-light  text-slate-400 peer-focus:text-blue-500"
        >
          {icon}
        </div>

        {type === 'password' && (
          <span
            onClick={() => setVisibility(!visibility)}
            className="material-symbols-outlined absolute right-0 flex h-full scale-90 cursor-pointer
            select-none items-center px-2 font-light text-slate-400 hover:bg-blue-100"
          >
            {!visibility ? 'visibility' : 'visibility_off'}
          </span>
        )}

        <label
          className="absolute left-2 origin-center -translate-y-6 scale-75 transform bg-white px-1
           text-gray-500 duration-300 peer-placeholder-shown:-z-20 peer-placeholder-shown:translate-x-10
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:z-20 peer-focus:-translate-x-0
            peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500 "
        >
          {label}
        </label>
      </div>
      {errors && <p className="absolute -bottom-5 pl-1 text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}
