import { Form, useForm } from "react-hook-form";
import Button from "../ui/components/Button";
import useCreateTeacher from "./useCreateTeacher";
import useCreateSubject from "../option/useCreateSubject";
import useSubjects from "../option/useSubjects";
import { uploadFile } from "../services_api/apiUploads";

function CreateTeacher() {
  const { isCreating, mutate } = useCreateTeacher();
  const { mutate: createSubjectMutate } = useCreateSubject();
  const { subjects } = useSubjects();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const teacherData = {
      phone: data.phone,
      subject: data.subject,
      name: data.teacher,
      avatar: data.image[0],
    };

    mutate(teacherData);
    addSubject(data.subject);
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

  return (
    <>
      <div className=" absolute inset-0 z-30   backdrop-blur-lg"></div>
      <div
        className=" absolute right-[50%] top-[50%]  z-40 h-max 
                    w-[700px]  shrink translate-x-[50%] 
                   translate-y-[-50%] space-y-4 rounded-lg border 
                   border-slate-700  bg-dark-primary  p-8 
                    "
      >
        <h1 className=" py-2 text-center text-2xl font-medium">ADD TEACHER</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          className=" space-y-6"
        >
          <div className="relative  flex  items-center justify-between">
            <label>Teacher Name</label>
            <div className=" basis-2/3">
              <input
                className=" w-full rounded bg-white/15 px-4 py-2 "
                type="text"
                id="teacher"
                placeholder="Teacher"
                {...register("teacher", {
                  required: "teacher name is required",
                })}
              ></input>
              {errors.subject && (
                <p className=" absolute text-sm font-medium text-red-700">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label>Subject</label>
            <input
              className="basis-2/3 rounded bg-white/15 px-4 py-2 "
              type="text"
              id="subject"
              placeholder="Subject"
              {...register("subject")}
            ></input>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="phone">Phone</label>
            <input
              className="basis-2/3 rounded bg-white/15 px-4 py-2 "
              type="text"
              id="phone"
              {...register("phone")}
              placeholder="Phone"
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
                htmlFor="image"
              >
                Upload File
              </label>
              <input
                id="image"
                {...register("image")}
                className=" -z-10 w-full py-2 pl-1 "
                type="file"
              ></input>
            </div>
          </div>

          <div className=" flex justify-end gap-4 pt-4">
            <Button to="-1" onType="reset" type="secondery">
              Close
            </Button>
            <Button
              disabled={isCreating}
              ontype="submit"
              spinner={isCreating}
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

export default CreateTeacher;
