import OptionTable from './OptioTable';
import useCreateOption from './useCreateOption';
import useDeleteOption from './useDeleteOption';
import useOptions from './useOptions';

export default function OptionGrade() {
  const { options, isLoading, error } = useOptions('grade');
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateOption('grade');
  const { isDeleting, mutate: mutateDelete } = useDeleteOption('grade');

  const data = options?.map((grade) => [grade._id, grade.gradeName]);

  function createHandler(grade) {
    mutateCreate({ option: 'grade', optionData: { gradeName: grade } });
  }

  function deleteHandler(gradeId) {
    mutateDelete({ option: 'grade', optionId: gradeId });
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
