import { Form } from 'react-router-dom';
import { useChangePassword } from '../authentication/useChangePassword';
import Button from '../ui/components/Button';
import { useForm } from 'react-hook-form';

function ChangePassword() {
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  function onUpdatePassword(data) {
    const newData = {
      currentPassword: data.curent_password,
      newPassword: data.new_password,
    };

    changePassword(newData, {
      onSettled: () => {
        setValue('new_password', ''),
          setValue('curent_password', ''),
          setValue('confirm_password', '');
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onUpdatePassword)} control={control}>
      <div className="mt-4 flex items-center justify-between">
        <label from="curent_password">Current Password</label>
        <div className="relative flex basis-[65%] flex-col">
          <input
            className=" rounded border border-border-1 bg-bg--primary-200 px-4 
             py-3 shadow focus:outline focus:outline-slate-400 "
            type="password"
            id="curent_password"
            placeholder="Current password"
            {...register('curent_password', {
              required: 'This field is required',
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
            className="basis-[65%] rounded border border-border-1 bg-bg--primary-200
             px-4 py-3  shadow focus:outline focus:outline-slate-400 "
            type="password"
            required
            id="new_password"
            {...register('new_password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
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
            className=" w-full rounded border border-border-1 bg-bg--primary-200 px-4
             py-3 shadow  focus:outline focus:outline-slate-400 "
            type="password"
            required
            placeholder="New password"
            id="confirm_password"
            {...register('confirm_password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              validate: (value) => {
                return (
                  value === getValues('new_password') ||
                  'Password & confirmPassword should be same.'
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
        <Button disabled={isChangingPassword} spinner={isChangingPassword} type="primary">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default ChangePassword;
