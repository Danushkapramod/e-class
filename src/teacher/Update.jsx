import Spinner from '../ui/components/Spinner';
import { Form, useForm } from 'react-hook-form';
import Error from '../ui/components/Error';
import Button from '../ui/components/Button';
import { useParams } from 'react-router-dom';
import useSetRoot from '../utils/setRoot';
import useUpdateTeacher from './useUpdateTeacher';
import useTeachers from './useTeachers';

function Update() {
  useSetRoot('update');

  const { id } = useParams();
  const { teachers, isSuccess, error } = useTeachers();
  const { isUpdating, mutate } = useUpdateTeacher();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  if (!isSuccess) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  const teacherData = teachers.filter((teacherData) => {
    return teacherData._id === id;
  });
  const { name, subject, phone, avatar: image, _id } = teacherData[0];

  const onSubmit = (data) => {
    const newData = {
      phone: data.phone,
      subject: data.subject,
      name: data.teacher,
      avatarFile: data.image[0],
      avatarDbUrl: image,
    };
    mutate({ teacherId: _id, newData });
  };

  return (
    <div className=" mx-auto mt-4 flex w-full max-w-[700px] flex-col space-y-4 rounded-lg bg-bg--primary-500  p-8">
      <h1 className=" py-2 text-center text-2xl font-medium">UPDATE TEACHER</h1>
      <Form onSubmit={handleSubmit(onSubmit)} control={control} className=" space-y-6">
        <div className=" relative flex items-center justify-between">
          <label>Teacher Name</label>
          <div className="basis-2/3">
            <input
              className="w-full rounded border border-bg--primary-100 bg-bg--primary-200 
                  px-4 py-2 shadow outline-1 outline-text--muted focus:outline "
              type="text"
              id="teacher"
              defaultValue={name}
              placeholder="Teacher"
              {...register('teacher', {
                required: 'teacher name is required',
              })}
            ></input>
            {errors.subject && (
              <p className=" absolute text-sm font-medium text-red-700">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label>Subject</label>
          <input
            className=" w-full basis-2/3 rounded border border-bg--primary-100 bg-bg--primary-200 
                  px-4 py-2 shadow outline-1 outline-text--muted focus:outline "
            type="text"
            id="subject"
            defaultValue={subject}
            placeholder="Subject"
            {...register('subject')}
          ></input>
        </div>

        <div className="flex items-center justify-between">
          <label>Phone</label>
          <input
            className=" w-full basis-2/3 rounded border border-bg--primary-100 bg-bg--primary-200 
                  px-4 py-2 shadow outline-1 outline-text--muted focus:outline "
            type="text"
            id="phone"
            defaultValue={phone}
            {...register('phone')}
            placeholder="Phone"
          ></input>
        </div>
        <div className=" flex  items-center justify-between ">
          <label>Class Poster</label>
          <div
            className=" relative flex basis-2/3 items-center rounded border 
                               border-bg--primary-200 px-2"
          >
            <label
              className=" absolute   inline-block  cursor-pointer 
                  rounded bg-indigo-600 px-3 py-1.5 font-medium "
              htmlFor="image"
            >
              Upload File
            </label>
            <input
              id="image"
              {...register('image')}
              className="  w-full py-2 pl-1 "
              type="file"
            ></input>
          </div>
        </div>

        <div className=" flex justify-end gap-4 pt-4">
          <Button to="-1" onType="reset" type="secondery">
            Close
          </Button>
          <Button disabled={isUpdating} ontype="submit" spinner={isUpdating} type="primary">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Update;
