import { useEffect, useRef, useState } from "react";
import { useUpdate } from "../authentication/useUpdate";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import Button from "../ui/components/Button";

function ChangeProfile({ auther }) {
  const { mutate: updateProfileData, isPending: isUpdatingProfileData } =
    useUpdate();

  const { register, setValue, handleSubmit, control } = useForm();

  useEffect(() => {
    if (!auther) return;
    setValue("name", auther.auther?.name);
    setValue("email", auther.auther?.email);
    setValue("phone", auther.auther?.phone);
  }, [setValue, auther]);

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
          className=" basis-[70%] rounded-full border border-slate-700 bg-transparent px-4 py-2 "
          disabled
          value={auther.auther?.email}
        ></input>
        <span
          className="material-symbols-outlined absolute right-2  cursor-pointer 
                 select-none rounded-full p-1 font-light"
        >
          lock
        </span>
      </div>

      <DataField
        options={{
          register,
          defaultV: auther.auther?.name,
          id: "name",
          placeholder: "Name",
        }}
      />
      <DataField
        options={{
          register,
          defaultV: auther.auther?.phone,
          id: "phone",
          placeholder: "Phone",
        }}
      />

      <div className="flex justify-end pt-6">
        <Button
          disabled={isUpdatingProfileData}
          spinner={isUpdatingProfileData}
          type="primary"
        >
          update
        </Button>
      </div>
    </Form>
  );
}

function DataField({ options: { register, defaultV, id, placeholder } }) {
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
        <input
          className="w-full rounded border border-slate-700 bg-white/10 
                       px-4 py-2 focus:outline focus:outline-slate-400"
          type="text"
          id={id}
          defaultValue={defaultV}
          placeholder={placeholder}
          disabled={isActive}
          {...register(id)}
          ref={inputRef}
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
