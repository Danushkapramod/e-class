import OptionTable from './OptioTable';
import useCreateOption from './useCreateOption';
import useDeleteOption from './useDeleteOption';
import useOptions from './useOptions';

function OptionSubject() {
  const { options, isLoading, error } = useOptions('subject');
  const { isCreating, mutate: mutateCreate, isSuccess } = useCreateOption('subject');
  const { isDeleting, mutate: mutateDelete } = useDeleteOption('subject');

  const data = options?.map((subject) => [subject._id, subject.subjectName]);

  function createHandler(subject) {
    mutateCreate({ optionData: { subjectName: subject }, option: 'subject' });
  }
  function deleteHandler(subjectId) {
    mutateDelete({ option: 'subject', optionId: subjectId });
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
