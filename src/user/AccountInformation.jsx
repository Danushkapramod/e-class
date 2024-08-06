import { useEffect, useMemo, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import { useAuther } from '../authentication/useAuther';
import Spinner from '../ui/components/Spinner';
import Error from '../ui/components/Error';
import ChangeProfile from './ChangeProfile';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { AppInputField } from '../ui/components/AppInputField';
import { useUpdate } from '../authentication/useUpdate';
import useUpdateUserAvatar from './useUploadImage';
import { Button } from '../ui/components/ButtonNew';

function AccountInformation() {
  const { auther, isLoading, error } = useAuther();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  return (
    <div className="flex justify-center text-text--primary">
      <div className="mt-4 flex w-full max-w-[900px] flex-col items-center gap-2">
        <LeftSection auther={auther} />
        <RightSection auther={auther} />
        <MetaInfo auther={auther} />
      </div>
    </div>
  );
}

function MetaInfo({ auther }) {
  const { mutate, isPending } = useUpdate();
  const [isLock, setIsLock] = useState(true);

  const {
    control,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: useMemo(() => auther.auther.metaData, [auther.auther.metaData]),
  });

  useEffect(() => {
    if (!isLock) setFocus('instituteName');
  }, [isLock, setFocus]);

  function onSubmit(data) {
    mutate({ metaData: data });
  }

  return (
    <Form
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded border border-border-1 p-6 shadow-md"
    >
      <div className=" flex justify-between text-text--secondery">
        <p className=" text-xl uppercase text-text--muted">Institute Information</p>
        <button
          type="button"
          onClick={() => setIsLock(!isLock)}
          className="material-symbols-outlined font-light"
        >
          {isLock ? 'lock' : 'lock_open'}
        </button>
      </div>
      <div className={`${isLock && 'opacity-80'} flex flex-col gap-4 pt-6`}>
        <div className="flex flex-col gap-0.5">
          <span className="">Institute Name</span>
          <AppInputField
            name="instituteName"
            disabled={isLock}
            rules={{ required: 'emply input!' }}
            errors={errors.instituteName}
            control={control}
            placeholder="Institute name"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="">Address</span>
          <AppInputField
            name="address"
            disabled={isLock}
            errors={errors.address}
            control={control}
            placeholder="Address"
            rules={{ required: 'emply input!' }}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="">City</span>
          <AppInputField
            name="city"
            disabled={isLock}
            errors={errors.city}
            rules={{ required: 'emply input!' }}
            control={control}
            placeholder="City"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          spinner={isPending}
          disabled={isPending}
          label={auther?.auther.metaData ? 'UPDATE' : 'SAVE'}
        />
      </div>
    </Form>
  );
}

function LeftSection({ auther }) {
  const { mutate: deleteImage, isPending: isDeletingImage } = useUpdateUserAvatar();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUpdateUserAvatar();

  function onSubmitAvatar(e) {
    e.preventDefault();
    if (!e.target.avatar.files[0]) return;
    uploadImage({
      avatarFile: e.target.avatar.files[0],
      avatarDbUrl: auther.auther.avatar,
    });
  }

  function delecteUserAvatar() {
    if (!auther.auther.avatar) return;
    deleteImage({
      avatarDbUrl: auther.auther.avatar,
    });
  }
  return (
    <div className=" flex w-full min-w-96 grow flex-col items-center rounded-md p-6">
      <div className="mt-4 rounded-full border-2 border-border-1 p-1.5 shadow-md">
        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full ">
          <img
            className="h-full object-cover"
            src={
              auther.auther?.avatar
                ? auther.auther?.avatar
                : 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg'
            }
            alt="user_image"
          />
        </div>
      </div>

      <form className="mt-3  flex gap-2" onSubmit={onSubmitAvatar}>
        <label
          disabled={isUploadingImage}
          className=" px-2py-0.5 flex items-center justify-center  
          rounded bg-bg--secondery-2 text-xs uppercase text-slate-200"
          htmlFor="avatar"
        >
          <div
            className={`${isUploadingImage && ' opacity-0'} flex items-center justify-center px-2`}
          >
            update
          </div>

          {isUploadingImage && (
            <div className=" absolute flex  scale-[35%] items-center justify-center ">
              <FadeLoader margin={0} color="#FFFFFF" />
            </div>
          )}
        </label>

        <input
          id="avatar"
          name="avatar"
          type="file"
          hidden
          onChange={(e) => {
            const form = e.target.form;
            form.requestSubmit();
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            delecteUserAvatar();
          }}
          disabled={isDeletingImage}
          size="xs"
          variant="outline"
          spinner={isDeletingImage}
          label="DELETE"
        />
      </form>

      <p className=" mr-4 mt-4 flex items-center gap-1 text-xl font-medium">
        <span className="material-symbols-outlined scale-90 font-light ">person</span>
        {auther.auther?.name}
      </p>
    </div>
  );
}

function RightSection() {
  const [isShow, setIsShow] = useState('editProfile');
  const [emailWindow, setEmailwindow] = useState('EmailChangeWindow');

  function isOpenHandler(e) {
    setIsShow(e.target.name);
  }
  return (
    <div className="  w-full grow rounded-md border border-border-1 bg-bg--primary-300 p-6 shadow-md">
      <p className=" text-xl uppercase text-text--muted">Account Information</p>
      <div className=" mt-4">
        <div className=" flex w-full  rounded-t-md border-b-2 border-slate-400 bg-bg--primary-200">
          <button
            name="editProfile"
            onClick={isOpenHandler}
            className={` basis-1/3 rounded-ss px-4 py-2 ${isShow === 'editProfile' && 'bg-bg--primary-100'}`}
          >
            Edit Profile
          </button>
          <button
            name="changeEmail"
            onClick={isOpenHandler}
            className={` basis-1/3 px-4 py-2 ${isShow === 'changeEmail' && 'bg-bg--primary-100'}`}
          >
            Change Email
          </button>
          <button
            name="changePassword"
            onClick={isOpenHandler}
            className={` basis-1/3 rounded-se px-4 py-2 ${isShow === 'changePassword' && 'bg-bg--primary-100'}`}
          >
            Change Password
          </button>
        </div>
        <div className=" min-h-[16rem] px-2 pt-4">
          {isShow === 'editProfile' && (
            <ChangeProfile window={emailWindow} setWindow={setEmailwindow} />
          )}
          {isShow === 'changeEmail' && (
            <ChangeEmail window={emailWindow} setWindow={setEmailwindow} />
          )}
          {isShow === 'changePassword' && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
