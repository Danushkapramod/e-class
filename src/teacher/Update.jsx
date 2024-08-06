import { Form, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useSetRoot from '../utils/setRoot';
import useUpdateTeacher from './useUpdateTeacher';
import useTeachers from './useTeachers';
import { AppInputField } from '../ui/components/AppInputField';
import { useMemo } from 'react';
import { Button } from '../ui/components/ButtonNew';

function Update() {
  useSetRoot('update');
  const { id } = useParams();
  const { teachers } = useTeachers();
  const { isUpdating, mutate } = useUpdateTeacher();

  const teacherData = teachers?.find((teacherData) => teacherData._id === id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return { ...teacherData, avatar: undefined };
    }, [teacherData]),
  });

  const onSubmit = (data) => {
    const newData = {
      ...data,
      avatarDbUrl: teacherData.avatar || undefined,
      avatarFile: data.avatar[0],
    };
    mutate({ teacherId: id, newData });
  };

  return (
    <div className=" mx-auto mt-4 flex w-full max-w-[700px] flex-col space-y-4 rounded-lg bg-bg--primary-500  p-8">
      <h1 className=" py-2 text-center text-2xl font-medium">UPDATE TEACHER</h1>
      <Form onSubmit={handleSubmit(onSubmit)} control={control} className="space-y-6">
        <div className="relative flex  items-center justify-between">
          <label>Teacher Name</label>
          <div className=" basis-2/3">
            <AppInputField
              name="name"
              errors={errors.name}
              control={control}
              placeholder="Teacher"
              rules={{ required: 'This field is required' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label>Subject</label>
          <div className=" basis-2/3">
            <AppInputField
              name="subject"
              errors={errors.subject}
              control={control}
              placeholder="Subject"
              rules={{ required: 'This field is required' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="phone">Phone</label>
          <div className=" basis-2/3">
            <AppInputField
              name="phone"
              errors={errors.phone}
              control={control}
              placeholder="Phone"
              rules={{ required: 'This field is required' }}
            />
          </div>
        </div>

        <div className=" flex  items-center justify-between ">
          <span>Class Poster</span>
          <div
            className=" border-bg--secondery-300 relative z-0 flex basis-2/3 
              items-center rounded border border-border-2 px-2"
          >
            <label
              className="absolute inline-block cursor-pointer 
                  rounded bg-indigo-600 px-3 py-1.5 font-medium "
              htmlFor="avatar"
            >
              Upload File
            </label>
            <input
              id="avatar"
              {...register('avatar')}
              className=" -z-10 w-full py-2 pl-1 "
              type="file"
            ></input>
          </div>
        </div>

        <div className=" flex justify-end gap-4 pt-4">
          <Button to={-1} variant="outline" label="CLOSE" />
          <Button disabled={isUpdating} spinner={isUpdating} label="SUBMIT" />
        </div>
      </Form>
    </div>
  );
}

export default Update;
