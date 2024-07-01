import Button from "../ui/components/Button";
import { Form, useForm } from "react-hook-form";
import Select from "../ui/components/Select";
import { useDispatch, useSelector } from "react-redux";
import { setTempCreateFormData } from "./classSlice";
import useCreateClass from "./useCreateClass";
import useTeachers from "../teacher/useTeachers";
import useHalls from "../option/useHalls";
import useSubjects from "../option/useSubjects";
import useGrades from "../option/useGrades";
import useCreateSubject from "../option/useCreateSubject";

const days = [
  "Mondaya",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function ClassForm() {
  const dispatch = useDispatch();
  const { tempCreateFormData } = useSelector((store) => store.class);

  const { isCreating, mutate } = useCreateClass();
  const { teachers, isLoading: teachersIsloading } = useTeachers();
  const { halls, isLoading: hallsIsloading } = useHalls();
  const { subjects, isLoading: subjectsIsloading } = useSubjects();
  const { grades, isLoading: gradesIsloading } = useGrades();
  const { mutate: createSubjectMutate } = useCreateSubject();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: tempCreateFormData,
  });
  const onSubmit = (data) => {
    const classData = {
      subject: data.subject,
      grade: data.grade,
      hall: data.hallNumber,
      teacher: data.teacherId,
      day: data.classDay,
      startTime: data.classTime,
      duration: data.duration,
      charging: data.charging,
      avatar:
        "https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/classes-images/ICT_LsuL6Tord6.png",
    };

    console.log(classData);
    dispatch(setTempCreateFormData({}));
    addSubject(data.subject);
    mutate(classData);
  };

  function addSubject(subject) {
    if (
      !subjects.some(
        (sub) => sub.subjectName.toLowerCase() === subject.toLowerCase(),
      )
    ) {
      createSubjectMutate({ subjectName: subject });
    }
  }

  function onSelectAdd() {
    const formData = getValues();
    dispatch(setTempCreateFormData(formData));
  }

  return (
    <>
      <div className=" absolute inset-0  backdrop-blur-lg"></div>
      <div
        className=" absolute right-[50%]  top-[50%] flex h-max w-full  max-w-[1000px] translate-x-[50%] translate-y-[-50%] flex-col 
                     space-y-4 rounded-lg border border-slate-700 
                     bg-dark-primary    p-6  "
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
              <div className="relative basis-2/3">
                <input
                  className=" w-full rounded border border-slate-600
                   bg-white/15 px-4 py-2 pr-14 "
                  type="text"
                  id="subject"
                  value={watch("subject")}
                  placeholder="Subject"
                  onChange={(e) => setValue("subject", e.target.value)}
                  {...register("subject", {
                    required: "This field is required",
                  })}
                ></input>
                {errors.subject && (
                  <p className=" absolute mt-px pb-4 text-sm font-medium text-red-700">
                    {errors.subject.message}
                  </p>
                )}
                <div className=" absolute right-0 top-0 ">
                  <Select
                    setValue={(subject) => setValue("subject", subject)}
                    search={true}
                    data={subjects}
                    isLoading={subjectsIsloading}
                    showValue={false}
                    valueName="subjectName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <label>Grade</label>
              <div className="relative basis-2/3">
                <input
                  className="w-full basis-2/3 rounded border border-slate-600 bg-white/15  px-4 py-2  "
                  type="text"
                  id="grade"
                  value={watch("grade")}
                  onChange={(e) => setValue("grade", e.target.value)}
                  {...register("grade", {
                    required: "This field is required",
                  })}
                  placeholder="Grade"
                ></input>
                {errors.grade && (
                  <p className=" absolute mt-px pb-4 text-sm font-medium text-red-700">
                    {errors.grade.message}
                  </p>
                )}
                <div className=" absolute right-0 top-0 ">
                  <Select
                    setValue={(grade) => setValue("grade", grade)}
                    search={true}
                    data={grades}
                    isLoading={gradesIsloading}
                    showValue={false}
                    valueName="gradeName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label>Hall number</label>
              <div className="relative basis-2/3">
                <input
                  className="w-full basis-2/3 rounded border border-slate-600 bg-white/15  px-4 py-2  "
                  type="text"
                  id="hallNumber"
                  value={watch("hallNumber")}
                  placeholder="Select hall"
                  disabled={true}
                  {...register("hallNumber", {
                    required: "This field is required",
                  })}
                ></input>
                {errors.hall && (
                  <p className=" absolute mt-px pb-4 text-sm font-medium text-red-700">
                    {errors.hall.message}
                  </p>
                )}
                <div className=" absolute right-0 top-0 ">
                  <Select
                    setValue={(hall) => setValue("hallNumber", hall)}
                    search={true}
                    data={halls}
                    isLoading={hallsIsloading}
                    showValue={false}
                    valueName="hallName"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Day</label>
              <select
                className="basis-2/3 rounded border border-slate-600 bg-white/15 px-4 py-2 "
                id="classDay"
                {...register("classDay")}
              >
                {days.map((day, index) => {
                  return (
                    <option
                      className=" bg-dark-primary "
                      key={index}
                      value={day}
                    >
                      {day}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Time</label>
              <input
                className="basis-2/3 rounded border border-slate-600 bg-white/15 px-4 py-2 "
                type="time"
                defaultChecked={false}
                id="classTime"
                {...register("classTime")}
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label>Class Duration</label>
              <input
                id="duration"
                {...register("duration")}
                className="basis-2/3 rounded border border-slate-600 bg-white/15 px-4 py-2 "
                type="number"
                placeholder="Duration"
              ></input>
            </div>
          </div>
          <div className=" w-[25rem flex w-[25rem] max-w-[30rem] grow  flex-col space-y-6">
            <div className="flex   justify-between">
              <label>Teacher Name</label>

              <div className="relative basis-2/3">
                <input
                  className="w-full basis-2/3 rounded border border-slate-600 bg-white/15  px-4 py-2  "
                  type="text"
                  id="teacher"
                  value={watch("teacher")}
                  disabled={true}
                  placeholder="Select teacher"
                  {...register("teacher", {
                    required: "This field is required",
                  })}
                ></input>

                <input
                  hidden={true}
                  {...register("teacherId")}
                  value={getValues("teacherId")}
                  id="teacherId"
                  type="text"
                />
                {errors.hall && (
                  <p className=" absolute mt-px pb-4 text-sm font-medium text-red-700">
                    {errors.hall.message}
                  </p>
                )}
                <div className=" absolute right-0 top-0 ">
                  <Select
                    setValueId={(teacherId) => setValue("teacherId", teacherId)}
                    setValue={(teacher) => setValue("teacher", teacher)}
                    search={true}
                    data={teachers}
                    isLoading={teachersIsloading}
                    showValue={false}
                    add={{ to: "/app/teachers/new", onClick: onSelectAdd }}
                    valueName="name"
                    idName="_id"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label>Charging</label>
              <input
                id="charging"
                {...register("charging")}
                className="basis-2/3 rounded border border-slate-600 bg-white/15 px-4 py-2 "
                type="number"
                placeholder="Optional*"
              ></input>
            </div>
            <div className=" flex  items-center justify-between ">
              <label>Class Poster</label>
              <div
                className=" relative flex basis-2/3 items-center rounded 
                               border border-slate-800 px-2"
              >
                <label
                  className=" absolute   inline-block  cursor-pointer 
                  rounded bg-indigo-600 px-3 py-1.5 font-medium "
                  htmlFor="class_poster"
                >
                  Upload File
                </label>
                <input
                  id="class_poster"
                  {...register("class_poster")}
                  className=" -z-10 w-full py-2 pl-1 "
                  type="file"
                ></input>
              </div>
            </div>
          </div>
          <div className=" my-auto flex w-full justify-end gap-4 ">
            <Button
              to="-1"
              disabled={isCreating}
              onClick={(e) => e.preventDefault()}
              type="secondery"
            >
              Back
            </Button>
            <Button
              spinner={isCreating}
              disabled={isCreating}
              ontype="submit"
              type="primary"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ClassForm;
