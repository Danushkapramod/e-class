import OptionTable from './OptioTable';
import useCreateSubItem from './useCreateSubItem';
import useDeleteSubItem from './useDelete';
import useSubItems from './useSubIttems';

export default function OptionHall() {
  const { data: halls, isLoading, error } = useSubItems({ key: 'halls', category: 'hall' });
  const { isPending: isCreating, mutate: create, isSuccess } = useCreateSubItem('halls');
  const { isPending: isDeleting, mutate: _delete } = useDeleteSubItem('halls');

  const data = halls?.map((hall) => [hall._id, hall.itemName]);

  function createHandler(hall) {
    create({ itemName: hall, category: 'hall' });
  }

  function deleteHandler(id) {
    _delete(id);
  }
  return (
    <OptionTable
      fieldName="Halls"
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
