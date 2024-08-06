import { useEffect, useRef, useState } from 'react';
import { useUpdate } from '../authentication/useUpdate';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { useAuther } from '../authentication/useAuther';
import { Button } from '../ui/components/ButtonNew';

function ChangeProfile() {
  const { auther, isLoading } = useAuther();
  const { mutate: updateProfileData, isPending: isUpdatingProfileData } = useUpdate();

  const { register, setValue, handleSubmit, control } = useForm();

  useEffect(() => {
    setValue('name', auther?.auther?.name);
    setValue('email', auther?.auther?.email);
    setValue('phone', auther?.auther?.phone);
  }, [setValue, auther, isLoading]);

  function onUpdateProfile(newData) {
    updateProfileData(newData);
  }

  return (
    <Form onSubmit={handleSubmit(onUpdateProfile)} control={control}>
      <div className=" relative mt-6 flex items-center justify-between">
        <label from="email" className="pl-4">
          Email
        </label>
        <input
          className=" basis-[70%] rounded-full border border-bg--primary-100 
          bg-transparent px-4 py-2 text-text--secondery"
          disabled
          value={auther.auther?.email}
        ></input>
        <span
          className="material-symbols-outlined absolute right-2  
          cursor-pointer  select-none rounded-full p-1 font-light"
        >
          lock
        </span>
      </div>

      <DataField
        options={{
          register,
          control,
          defaultV: auther.auther?.name,
          id: 'name',
          placeholder: 'Name',
        }}
      />
      <DataField
        options={{
          register,
          control,
          defaultV: auther.auther?.phone,
          id: 'phone',
          placeholder: 'Phone',
        }}
      />

      <div className="flex justify-end pt-6">
        <Button disabled={isUpdatingProfileData} spinner={isUpdatingProfileData} label="UPDATE" />
      </div>
    </Form>
  );
}

function DataField({ options: { defaultV, id, placeholder, control } }) {
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isActive) inputRef.current.focus();
  }, [isActive]);

  return (
    <div className="mt-4 flex items-center justify-between">
      <label htmlFor="name" className=" pl-4">
        Name
      </label>
      <div className="relative flex basis-[70%] items-center">
        <Controller
          name={id}
          control={control}
          defaultValue={defaultV}
          render={({ field }) => (
            <input
              {...field}
              className="w-full rounded border border-bg--primary-200 bg-bg--primary-200 
              px-4 py-3 shadow focus:outline focus:outline-slate-400"
              type="text"
              id={id}
              placeholder={placeholder}
              disabled={isActive}
              ref={inputRef}
            />
          )}
        />
        <span
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="material-symbols-outlined absolute right-2  cursor-pointer 
                 select-none rounded-full p-1 font-light  hover:bg-white/10"
        >
          edit
        </span>
      </div>
    </div>
  );
}

export default ChangeProfile;
