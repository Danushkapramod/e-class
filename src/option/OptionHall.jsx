import OptionTable from './OptioTable';
import useCreateOption from './useCreateOption';
import useDeleteOption from './useDeleteOption';
import useOptions from './useOptions';

export default function OptionHall() {
  const { options, isLoading, error } = useOptions('hall');
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateOption('hall');
  const { isDeleting, mutate: mutateDelete } = useDeleteOption('hall');

  const data = options?.map((hall) => [hall._id, hall.hallName]);

  function createHandler(hall) {
    mutateCreate({ option: 'hall', optionData: { hallName: hall } });
  }

  function deleteHandler(hallId) {
    mutateDelete({ option: 'hall', optionId: hallId });
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
