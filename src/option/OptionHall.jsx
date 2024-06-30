import OptionTable from "./OptioTable";
import useCreateHall from "./useCreateHall";
import useDeleteHall from "./useDeleteHall";
import useHalls from "./useHalls";

export default function OptionHall() {
  const { halls, isLoading, error } = useHalls();
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateHall();
  const { isDeleting, mutate: mutateDelete } = useDeleteHall();

  const data = halls?.map((hall) => hall.hallName);

  function createHandler(hall) {
    mutateCreate({ hallName: hall });
  }

  function deleteHandler(hall) {
    mutateDelete(hall);
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
