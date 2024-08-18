import { Form, useForm } from 'react-hook-form';
import Select from '../ui/components/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateClassOpen, setTempCreateClassForm } from './classSlice';
import useCreateOption from '../option/useCreateOption';
import useCreateClass from './useCreateClass';
import useFormData from './useFormData';
import { useEffect, useState } from 'react';
import { AppInputField } from '../ui/components/AppInputField';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/components/ButtonNew';

const days = [
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' },
  { day: 'Sunday' },
];

export default function ClassForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tempCreateClassForm } = useSelector((store) => store.class);
  const [isSubmit, setIsSubmit] = useState(false);
  const { isCreating, mutate: createClass } = useCreateClass(setIsSubmit);
  const { mutate: createSubject } = useCreateOption('subject');

  const {
    teachers,
    halls,
    subjects,
    grades,
    teachersIsloading,
    hallsIsloading,
    subjectsIsloading,
    gradesIsloading,
  } = useFormData();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: tempCreateClassForm,
  });

  useEffect(() => {
    if (isSubmit) {
      dispatch(setIsCreateClassOpen(false));
      navigate(-1);
    }
    return () => {
      if (!isSubmit) {
        dispatch(setTempCreateClassForm(getValues()));
        dispatch(setIsCreateClassOpen(true));
      } else {
        dispatch(setTempCreateClassForm({}));
      }
    };
  }, [isSubmit, dispatch, getValues, navigate]);

  const onSubmit = (data) => {
    const classData = {
      ...data,
      teacher: data.teacherId,
      avatar: data.avatar[0] || undefined,
    };

    addSubject(data.subject);
    createClass(classData);
  };

  function addSubject(subject) {
    if (!subjects.some((sub) => sub.subjectName.toLowerCase() === subject.toLowerCase())) {
      createSubject({ subjectName: subject });
    }
  }

  return (
    <>
      <div className=" absolute inset-0  backdrop-blur-lg"></div>
      <div
        className="absolute right-[50%] top-[50%] flex h-max w-full max-w-[1000px] translate-x-[50%]
         translate-y-[-50%] flex-col space-y-4 rounded-lg bg-bg--primary-500 p-6"
      >
        <h1 className=" py-2 text-start text-2xl font-medium">ADD CLASS</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          className="flex flex-wrap justify-center gap-10"
        >
          <div className="w-[25rem] max-w-[30rem] grow space-y-6 ">
            <div className=" relative flex items-center justify-between">
              <label>Subject Name</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="subject"
                  errors={errors.subject}
                  control={control}
                  placeholder="Subject"
                  rules={{ required: 'This field is required' }}
                />
                <div className="absolute">
                  <Select
                    setValue={(subject) => setValue('subject', subject)}
                    search={true}
                    data={subjects}
                    isLoading={subjectsIsloading}
                    showValue={false}
                    valueName="itemName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <label>Grade</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="grade"
                  errors={errors.grade}
                  control={control}
                  placeholder="Grade"
                  rules={{ required: 'This field is required' }}
                />
                <div className=" absolute ">
                  <Select
                    setValue={(grade) => setValue('grade', grade)}
                    search={true}
                    data={grades}
                    isLoading={gradesIsloading}
                    showValue={false}
                    valueName="itemName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label>Hall number</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="hall"
                  errors={errors.hall}
                  control={control}
                  placeholder="Select hall"
                  rules={{ required: 'This field is required' }}
                />
                <div className="absolute">
                  <Select
                    setValue={(hall) => setValue('hall', hall)}
                    search={true}
                    data={halls}
                    isLoading={hallsIsloading}
                    showValue={false}
                    valueName="itemName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Day</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="day"
                  errors={errors.day}
                  control={control}
                  placeholder="Select Day"
                  rules={{ required: 'This field is required' }}
                />
                <div className="absolute">
                  <Select
                    setValue={(day) => setValue('day', day)}
                    data={days}
                    showValue={false}
                    valueName="day"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Time</label>
              <input
                className="w-full basis-2/3 rounded 
                bg-bg--primary-200 px-4 py-[10px]  outline 
                outline-1 outline-border-2 focus:outline-2 focus:outline-blue-500"
                type="time"
                defaultChecked={false}
                id="startTime"
                {...register('startTime')}
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Duration</label>
              <div className=" basis-2/3">
                <AppInputField
                  name="duration"
                  errors={errors.duration}
                  control={control}
                  placeholder="Duration"
                />
              </div>
            </div>
          </div>

          <div className=" w-[25rem flex w-[25rem] max-w-[30rem] grow  flex-col space-y-6">
            <div className="flex   justify-between">
              <label>Teacher Name</label>

              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="teacher"
                  errors={errors.teacher}
                  control={control}
                  placeholder="Select teacher"
                  rules={{ required: 'This field is required' }}
                />
                <input
                  hidden={true}
                  {...register('teacherId')}
                  value={getValues('teacherId')}
                  id="teacherId"
                  type="text"
                />
                <div className=" absolute">
                  <Select
                    setValueId={(teacherId) => setValue('teacherId', teacherId)}
                    setValue={(teacher) => setValue('teacher', teacher)}
                    search={true}
                    data={teachers}
                    isLoading={teachersIsloading}
                    showValue={false}
                    add={{
                      to: '/app/teachers/new',
                    }}
                    valueName="name"
                    idName="_id"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label>Charging</label>
              <div className="basis-2/3">
                <AppInputField
                  name="charging"
                  errors={errors.grade}
                  control={control}
                  placeholder="Optional*"
                />
              </div>
            </div>

            <div className=" flex  items-center justify-between ">
              <label>Class Poster</label>
              <div
                className=" relative flex basis-2/3 items-center
                 rounded border border-border-2 px-2"
              >
                <label
                  className=" absolute   inline-block  cursor-pointer
                  rounded bg-indigo-600 px-3 py-1.5 font-medium text-slate-200 "
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
          </div>
          <div className=" my-auto flex w-full justify-end gap-4 ">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsSubmit(true);
              }}
              disabled={isCreating}
              label="CLOSE"
              variant="outline"
            />
            <Button disabled={isCreating} spinner={isCreating} label="SUBMIT" />
          </div>
        </Form>
      </div>
    </>
  );
}
