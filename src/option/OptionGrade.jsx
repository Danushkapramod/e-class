import OptionTable from "./OptioTable";
import useCreateGrade from "./useCreateGrade";
import useDeleteGrade from "./useDeleteGrade";
import useGrades from "./useGrades";

export default function OptionGrade() {
  const { grades, isLoading, error } = useGrades();
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateGrade();
  const { isDeleting, mutate: mutateDelete } = useDeleteGrade();

  const data = grades?.map((grade) => [grade._id, grade.gradeName]);

  function createHandler(grade) {
    mutateCreate({ gradeName: grade });
  }

  function deleteHandler(grade) {
    mutateDelete(grade);
  }

  return (
    <OptionTable
      fieldName="Grades"
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
