import OptionTable from './OptioTable';
import useCreateSubItem from './useCreateSubItem';
import useDeleteSubItem from './useDelete';
import useSubItems from './useSubIttems';

function OptionSubject() {
  const {
    data: subjects,
    isLoading,
    error,
  } = useSubItems({ key: 'subjects', category: 'subject' });
  const { isPending: isCreating, mutate: create, isSuccess } = useCreateSubItem('subjects');
  const { isPending: isDeleting, mutate: _delete } = useDeleteSubItem('subjects');

  const data = subjects?.map((subject) => [subject._id, subject.itemName]);

  function createHandler(subject) {
    create({ itemName: subject, category: 'subject' });
  }

  function deleteHandler(id) {
    _delete(id);
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
