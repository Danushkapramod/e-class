import Button from "../ui/components/Button";
import { useState } from "react";
import useUploadImage from "./useUploadImage";
import { FadeLoader } from "react-spinners";
import { useAuther } from "../authentication/useAuther";
import Spinner from "../ui/components/Spinner";
import Error from "../ui/components/Error";
import ChangeProfile from "./ChangeProfile";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

function AccountInformation() {
  const { auther, isLoading, error } = useAuther();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  return (
    <div className="w-full">
      <p className=" text-2xl uppercase opacity-70">ACCOUNT</p>
      <div className="mt-4 flex w-full  flex-wrap gap-2">
        <LeftSection auther={auther} />
        <RightSection auther={auther} />
      </div>
    </div>
  );
}

function LeftSection({ auther }) {
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImage();
  const { mutate: deleteImage, isPending: isDeleteingImage } = useUploadImage();

  function onSubmitAvatar(e) {
    e.preventDefault();

    if (!e.target.user_avatar.files[0]) return;
    uploadImage({
      avatarFile: e.target.user_avatar.files[0],
      avatarDbUrl: auther.auther.avatar,
    });
  }

  function delecteUserAvatar() {
    deleteImage({ avatarDbUrl: auther.auther.avatar });
  }

  return (
    <div className=" flex  min-w-96  grow   flex-col items-center rounded-md border border-slate-800 bg-dark-primary p-6">
      <div className="mt-4 rounded-full border-2 p-1.5">
        <div className=" flex  h-40 w-40 items-center justify-center overflow-hidden rounded-full ">
          <img
            className="h-full object-cover"
            src={
              auther.auther.avatar
                ? auther.auther.avatar
                : "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
            }
            alt="user_image"
          />
        </div>
      </div>

      <form className="mt-3  flex gap-2" onSubmit={onSubmitAvatar}>
        <label
          disabled={isUploadingImage}
          className=" px-2py-0.5 flex items-center  justify-center rounded bg-blue-600 text-xs uppercase"
          htmlFor="updateAvatar"
        >
          <div
            className={`${isUploadingImage && " opacity-0"} flex items-center justify-center px-2`}
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
          accept="image/*"
          id="updateAvatar"
          name="user_avatar"
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
          disabled={isDeleteingImage}
          type="xsSecondery"
          spinner={isDeleteingImage}
        >
          delete
        </Button>
      </form>

      <p className=" mr-4 mt-4 flex items-center gap-1 text-xl font-medium">
        <span className="material-symbols-outlined scale-90 font-light ">
          person
        </span>
        {auther.auther.name}
      </p>
    </div>
  );
}

function RightSection({ auther }) {
  const [isShow, setIsShow] = useState("editProfile");
  const [emailWindow, setEmailwindow] = useState("EmailChangeWindow");

  function isOpenHandler(e) {
    setIsShow(e.target.name);
  }
  return (
    <div className=" h-[23rem] grow  rounded-md border border-slate-800 bg-dark-primary p-6">
      <div className="">
        <div className=" flex w-full  rounded-t-md border-b-2 border-slate-400 bg-white/5">
          <button
            name="editProfile"
            onClick={isOpenHandler}
            className={` basis-1/3  rounded-ss px-4 py-2 ${isShow === "editProfile" && "bg-white/10"}`}
          >
            Edit Profile
          </button>
          <button
            name="changeEmail"
            onClick={isOpenHandler}
            className={` basis-1/3   px-4 py-2 ${isShow === "changeEmail" && "bg-white/10"}`}
          >
            Change Email
          </button>
          <button
            name="changePassword"
            onClick={isOpenHandler}
            className={` basis-1/3  rounded-se px-4 py-2 ${isShow === "changePassword" && "bg-white/10"}`}
          >
            Change Password
          </button>
        </div>
        <div className=" min-h-[16rem] px-2 pt-4">
          {isShow === "editProfile" && (
            <ChangeProfile
              auther={auther}
              window={emailWindow}
              setWindow={setEmailwindow}
            />
          )}
          {isShow === "changeEmail" && (
            <ChangeEmail window={emailWindow} setWindow={setEmailwindow} />
          )}
          {isShow === "changePassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
