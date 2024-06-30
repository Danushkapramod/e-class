import { Form, useForm } from "react-hook-form";
import Button from "../ui/components/Button";
import { useEffect, useState } from "react";
import { useUser } from "../authentication/useUser";
import { useUpdate } from "../authentication/useUpdate";
import { useUpdatePassword } from "../authentication/useUpdatePassword";
import useUploadImage from "../hooks/useUploadImage";
import { FadeLoader } from "react-spinners";
import useDeleteImage from "../hooks/useDeleteImage";

function AccountInformation() {
  const [isShow, setIsShow] = useState("editProfile");
  const { user } = useUser();
  const { mutate: update, isPending: isUpdating } = useUpdate();
  const {
    mutate: deleteImage,
    isPending: isDeletingImage,
    isSuccess: isSuccessDeletingImage,
  } = useDeleteImage();
  const {
    mutate: uploadImage,
    isPending: isImgUploading,
    imageUrl,
  } = useUploadImage();

  const { mutate: updatePass, isPending: isUpdatingPass } = useUpdatePassword();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) return;
    setValue("name", user.user_metadata.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
  }, [setValue, user]);

  function isOpenHandler(e) {
    setIsShow(e.target.name);
  }

  function onUpdateProfile(data) {
    const newData = {
      data: {
        name: data.name,
      },
    };
    update(newData);
  }

  function onUpdateEmail() {}

  async function onSubmitAvatar(data) {
    if (user.user_metadata.avatar) {
      delecteUserAvatar();
    }
    uploadImage({
      bucketName: "user-avatars",
      imageFile: data.user_avatar[0],
      fileNameHeader: user.user_metadata.name.split(" ").join("_"),
    });
  }

  useEffect(() => {
    if (!imageUrl) return;
    update({
      data: {
        avatar: imageUrl,
      },
    });
  }, [imageUrl, update]);

  useEffect(() => {
    if (!isSuccessDeletingImage) return;
    update({
      data: {
        avatar: "",
      },
    });
  }, [isSuccessDeletingImage, update]);

  function onUpdatePassword(data) {
    const newData = {
      email: user.email,
      password: data.curent_password,
      newPassword: data.new_password,
    };
    updatePass(newData, {
      onSettled: () => {
        setValue("new_password", ""),
          setValue("curent_password", ""),
          setValue("confirm_password", "");
      },
    });
  }

  function delecteUserAvatar() {
    const filename = user.user_metadata.avatar.split("/").pop();
    deleteImage({
      bucketName: "user-avatars",
      fileName: filename,
    });
  }

  return (
    <div className="w-full">
      <p className=" text-2xl uppercase opacity-70">ACCOUNT</p>
      <div className="mt-4 flex w-full  flex-wrap gap-2">
        <div className=" flex  min-w-96  grow   flex-col items-center rounded-md border border-slate-800 bg-dark-primary p-6">
          <div className="mt-4 rounded-full border-2 p-1.5">
            <div className=" flex  h-40 w-40 items-center justify-center overflow-hidden rounded-full ">
              <img
                className="h-full object-cover"
                src={
                  user.user_metadata.avatar
                    ? user.user_metadata.avatar
                    : "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
                }
                alt="user_image"
              />
            </div>
          </div>

          <Form
            className="mt-3  flex gap-2"
            onSubmit={handleSubmit(onSubmitAvatar)}
            control={control}
          >
            <label
              disabled={isImgUploading}
              className=" flex items-center justify-center  rounded bg-blue-600 px-2
               py-0.5 text-xs uppercase"
              htmlFor="updateAvatar"
            >
              <div
                className={`${isImgUploading ? " opacity-0" : {}} flex items-center justify-center`}
              >
                update
              </div>

              {isImgUploading && (
                <div className=" absolute flex  scale-[35%] items-center justify-center ">
                  <FadeLoader margin={0} color="#FFFFFF" />
                </div>
              )}
            </label>

            <input
              accept="image/*"
              id="updateAvatar"
              type="file"
              hidden
              {...register("user_avatar", {
                onChange: (e) => {
                  const form = e.target.form;
                  form.requestSubmit();
                },
              })}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                delecteUserAvatar();
              }}
              disabled={isDeletingImage}
              type="xsSecondery"
            >
              delete
            </Button>
          </Form>

          <p className=" mr-4 mt-4 flex items-center gap-1 text-xl font-medium">
            <span className="material-symbols-outlined scale-90 font-light ">
              person
            </span>
            {user.user_metadata.name}
          </p>
        </div>
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
                <Form
                  onSubmit={handleSubmit(onUpdateProfile)}
                  control={control}
                >
                  <div className="mt-4 flex items-center justify-between">
                    <label from="name">Name</label>
                    <input
                      className=" basis-[65%] rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...register("name")}
                    ></input>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <label from="email">Email</label>
                    <input
                      className=" basis-[65%] rounded border border-slate-700 bg-white/15 px-4 py-2 opacity-75  focus:outline focus:outline-slate-400 "
                      type="email"
                      id="email"
                      disabled
                      placeholder="Email"
                      {...register("email")}
                    ></input>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <label from="phone">Phone</label>
                    <input
                      className="basis-[65%] rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      {...register("phone")}
                    ></input>
                  </div>
                  <div className="flex justify-end pt-6">
                    <Button
                      disabled={isUpdating}
                      spinner={isUpdating}
                      type="primary"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}

              {isShow === "changeEmail" && (
                <Form onSubmit={handleSubmit(onUpdateEmail)} control={control}>
                  <div className="mt-4 flex  items-center justify-between">
                    <label from="change_email">New Email</label>
                    <input
                      className="basis-[65%] rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                      type="email"
                      id="change_email"
                      placeholder="New Email"
                      {...register("change_email")}
                    ></input>
                  </div>
                  <div className="mt-auto flex justify-end pt-6">
                    <Button
                      disabled={isUpdating}
                      spinner={isUpdating}
                      type="primary"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}

              {isShow === "changePassword" && (
                <Form
                  onSubmit={handleSubmit(onUpdatePassword)}
                  control={control}
                >
                  <div className="mt-4 flex items-center justify-between">
                    <label from="curent_password">Current Password</label>
                    <div className=" relative flex basis-[65%] flex-col">
                      <input
                        className=" rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                        type="password"
                        id="curent_password"
                        placeholder="Current password"
                        {...register("curent_password", {
                          required: "This field is required",
                        })}
                      ></input>
                      {errors.curent_password && (
                        <p className=" absolute  -bottom-5 mt-px text-sm  text-yellow-600">
                          {errors.curent_password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <label from="new_password">New Password</label>
                    <div className=" relative flex basis-[65%] flex-col">
                      <input
                        className="basis-[65%] rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                        type="password"
                        required
                        id="new_password"
                        {...register("new_password", {
                          required: "This field is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                        placeholder="New password"
                      ></input>
                      {errors.new_password && (
                        <p className="  absolute -bottom-5 mt-px text-sm  text-yellow-600">
                          {errors.new_password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <label from="new_password">New Password</label>
                    <div className=" relative  flex basis-[65%] flex-col">
                      <input
                        className=" w-full rounded border border-slate-700 bg-white/15 px-4 py-2  focus:outline focus:outline-slate-400 "
                        type="password"
                        required
                        placeholder="New password"
                        id="confirm_password"
                        {...register("confirm_password", {
                          required: "This field is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                          validate: (value) => {
                            return (
                              value === getValues("new_password") ||
                              "Password & confirmPassword should be same."
                            );
                          },
                        })}
                      ></input>
                      {errors.confirm_password && (
                        <p className=" absolute  -bottom-5 mt-px text-sm  text-yellow-600">
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <Button
                      disabled={isUpdatingPass}
                      spinner={isUpdatingPass}
                      type="primary"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
