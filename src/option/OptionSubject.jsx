import OptionTable from "./OptioTable";
import useCreateSubject from "./useCreateSubject";
import useDeleteSubject from "./useDeleteSubject";
import useSubjects from "./useSubjects";

function OptionSubject() {
  const { subjects, isLoading, error } = useSubjects();
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateSubject();
  const { isDeleting, mutate: mutateDelete } = useDeleteSubject();

  const data = subjects?.map((subject) => [subject._id, subject.subjectName]);

  function createHandler(subject) {
    mutateCreate({ subjectName: subject });
  }
  function deleteHandler(subject) {
    mutateDelete(subject);
  }

  return (
    <OptionTable
      fieldName="Subject"
      data={data}
      mutateCreate={createHandler}
      mutateDelete={deleteHandler}
      isCreating={isCreating}
      isDeleting={isDeleting}
      isSuccess={isSuccess}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default OptionSubject;
