import { Form, useForm } from 'react-hook-form';
import { Button } from '../ui/components/ButtonNew';
import { AppInputField } from '../ui/components/AppInputField';
import Checkbox from '../ui/components/Checkbox';
import { useEffect, useState } from 'react';
import SelectClass from './SelectClass';
import { formatLocalTime } from '../utils/formateDates&Times';
import { twMerge } from 'tailwind-merge';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateStudent from './useUpdateStudent';
import { useResedQr } from './useReserndQr';
import { getStudentInfoForUpdate } from '../services/apiStudents';
import { useQuery } from '@tanstack/react-query';
import DataLoader from '../ui/components/DataLoader';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateStudent();
  const { mutate: reSendQr, isPending: qrSending } = useResedQr();
  const [selected, setSelected] = useState([]);
  const [selectClassOpn, setSelectClassOpen] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { data: student, isFetching } = useQuery({
    queryKey: ['stdData'],
    queryFn: () => getStudentInfoForUpdate(id),
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (!student) return;
    setValue('name', student?.name);
    setValue('phone', student?.phone);
    setSelected(student?.class);
  }, [isFetching, setValue, student]);

  const onSubmit = (data) => {
    const classes = selected.map(({ _id }) => {
      return { classId: _id, status: 'unpaid' };
    });
    if (!classes.length) return;
    console.log({ ...data, class: classes });
    mutate({ studentId: id, newData: { ...data, class: classes } });
  };

  const onResendQr = () => {
    const newData = {
      sendQr_whatsapp: getValues('sendQr_whatsapp'),
      sendQr_gmail: getValues('sendQr_gmail'),
      gmail: getValues('gmail'),
    };
    console.log(newData);

    if (!newData.sendQr_whatsapp && !getValues('gmail')) return;

    reSendQr(
      { studentId: id, newData },
      {
        onSuccess: () => {
          setValue('gmail', null);
          setValue('sendQr_gmail', false);
          setValue('sendQr_whatsapp', false);
        },
      }
    );
  };
  return (
    <>
      <div className=" absolute inset-0  backdrop-blur-lg"></div>
      <div
        className="absolute right-[50%] top-[50%] flex h-max w-full max-w-3xl translate-x-[50%]
         translate-y-[-50%] flex-col space-y-4 rounded-lg bg-bg--primary-500 p-6"
      >
        <h1 className=" py-2 text-start text-2xl font-medium">UPDATE STUDENT</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          className="gap-10, flex flex-col gap-4"
        >
          <div className="space-y-4 ">
            <div className=" relative flex items-center justify-between">
              <label>Name</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="name"
                  errors={errors.name}
                  control={control}
                  placeholder="Name"
                  rules={{ required: 'This field is required' }}
                />
              </div>
            </div>
            <div className=" relative flex items-center justify-between">
              <label>Phone</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="phone"
                  errors={errors.phone}
                  control={control}
                  placeholder="Phone"
                  rules={{ required: 'This field is required' }}
                />
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm text-text--secondery">Send QR</span>
            <div className="flex-row, flex gap-8">
              <div className="flex flex-row items-center gap-2">
                <p>Whatsapp</p>
                <Checkbox
                  id="whatsappChexbox"
                  checked={getValues('sendQr_whatsapp')}
                  trueCall={() => setValue('sendQr_whatsapp', true)}
                  falseCall={() => setValue('sendQr_whatsapp', false)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>Gmail</p>
                <Checkbox
                  id="gmailChexbox"
                  checked={getValues('sendQr_gmail')}
                  trueCall={() => setValue('sendQr_gmail', true)}
                  falseCall={() => setValue('sendQr_gmail', false)}
                />
              </div>
              <Button
                type="button"
                spinner={qrSending}
                onClick={onResendQr}
                variant="outline"
                size="sm"
                label="Resend-QR"
              />
            </div>
            <div className="hidden" {...register('sendQr_whatsapp')} />
            <div className="hidden" {...register('sendQr_gmail')} />
          </div>
          {watch('sendQr_gmail') && (
            <div className=" relative flex items-center justify-between">
              <label>Gmail</label>
              <div className="relative flex basis-2/3 items-center justify-end">
                <AppInputField
                  name="gmail"
                  errors={errors.gmail}
                  control={control}
                  placeholder="Gmail"
                  rules={{ required: 'This field is required' }}
                />
              </div>
            </div>
          )}
          <div>
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectClassOpen(!selectClassOpn);
                }}
                label="Select Class"
                size="sm"
              />
              {Boolean(selected.length) && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected([]);
                  }}
                  label="Clear"
                  size="sm"
                />
              )}
            </div>
          </div>

          {selected && (
            <ul className=" flex w-full flex-wrap gap-2">
              <DataLoader
                data={selected.map((classData) => {
                  return (
                    <div
                      className=" flex gap-2 rounded bg-hilight-1 pr-2"
                      key={classData._id}
                      onClick={null}
                    >
                      <ClassItem
                        className=" cursor-default border-none hover:scale-100"
                        classData={classData}
                      />
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            setSelected(selected.filter((item) => item._id !== classData._id))
                          }
                          className=" material-symbols-outlined scale-90 rounded-full 
                         bg-bg--primary-200 p-2 transition-all duration-150 hover:scale-[1.02]"
                        >
                          close
                        </button>
                      </div>
                    </div>
                  );
                })}
                isLoading={isFetching}
              />
            </ul>
          )}
          <div className=" my-auto mt-4 flex w-full justify-end gap-4 ">
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              label="CLOSE"
              variant="outline"
            />
            <Button disabled={isPending} spinner={isPending} label="SUBMIT" />
          </div>
        </Form>
      </div>
      {selectClassOpn && (
        <div className=" absolute bottom-2 left-2 right-2 top-0 bg-bg--primary-300">
          <SelectClass selected={selected} setSelected={setSelected} close={setSelectClassOpen} />
        </div>
      )}
    </>
  );
}

function ClassItem({ classData, className }) {
  const { _id, teacher, subject, avatar, startTime, day, grade } = classData;
  return (
    <li
      key={_id}
      className={twMerge(
        `flex cursor-pointer items-center rounded border border-border-3
           bg-hilight-1 transition-all duration-150 hover:scale-105 ${className}`
      )}
    >
      <div className="flex aspect-square h-[4.5rem] items-center justify-center overflow-hidden rounded-l">
        <img className="  h-full object-cover " src={avatar} alt="class-avatar" />
      </div>
      <div className=" flex h-full flex-col justify-between px-2 py-1 pr-3">
        <div className="text-sm capitalize">{`${subject} / Grade ${grade}`}</div>
        <div className=" flex flex-col justify-between text-sm capitalize text-text--secondery">
          <span>{teacher.name}</span>
          <span className=" text-xs">
            {day} {formatLocalTime(startTime)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default UpdateStudent;
