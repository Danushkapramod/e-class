import OptionTable from './OptioTable';
import useCreateSubItem from './useCreateSubItem';
import useDeleteSubItem from './useDelete';
import useSubItems from './useSubIttems';

export default function OptionGrade() {
  const { data: grades, isLoading, error } = useSubItems({ key: 'grades', category: 'grade' });
  const { isPending: isCreating, mutate: create, isSuccess } = useCreateSubItem('grades');
  const { isPending: isDeleting, mutate: _delete } = useDeleteSubItem('grades');

  const data = grades?.map((grade) => [grade._id, grade.itemName]);

  function createHandler(grade) {
    create({ itemName: grade, category: 'grade' });
  }

  function deleteHandler(id) {
    _delete(id);
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
