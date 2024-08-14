import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import useRestore from '../user/useRestore';
import Select from '../ui/components/Select';
import useDeletedLists from './useDeletedLists';

export function DeletedTable() {
  const {
    classes,
    students,
    teachers,
    alldeleted,
    setCategoryBy,
    restoreTeachers,
    restoreClasses,
    restoreStudents,
    isRestoring,
    isloading,
  } = useDeletedLists();

  function restoreAll() {
    const classIdList = classes.map((item) => item._id);
    const studentIdList = students.map((item) => item._id);
    const teacherIdList = teachers.map((item) => item._id);

    if (classIdList.length) {
      restoreClasses({ endPoit: 'classes/hide', idList: classIdList });
    }
    if (studentIdList.length) {
      restoreStudents({ endPoit: 'students/hide', idList: studentIdList });
    }
    if (teacherIdList.length) {
      restoreTeachers({ endPoit: 'teachers/hide', idList: teacherIdList });
    }
  }
  return (
    <div className="pt-2">
      <div className=" flex justify-end gap-2 pb-3">
        <Button
          onClick={restoreAll}
          className="border-none bg-green-600  hover:bg-green-700"
          spinner={isRestoring}
          icon="cycle"
          label="RESTORE ALL"
        />
        <Button
          //  onClick={onRestore}
          //spinner={isPending}
          icon="delete"
          variant="outline"
          label="DELETE ALL"
        />
      </div>
      <div className=" flex w-full flex-col rounded border border-border-2">
        <div className="flex h-12 items-center justify-center border-b border-border-2 font-medium">
          <div className="basis-14 pl-4">#</div>
          <div className=" flex basis-1/3 items-center gap-1">
            <div>Category</div>
            <Select
              className="bg-transparent"
              setValueId={(valueId) => setCategoryBy(valueId)}
              idName="id"
              data={[
                { category: 'All', id: 'none' },
                { category: 'Class', id: 'class' },
                { category: 'Teacher', id: 'teacher' },
                { category: 'Student', id: 'student' },
              ]}
              showValue={true}
              initial="All"
              valueName="category"
            />
          </div>
          <div className=" basis-1/3">Deleted At</div>
          <div className=" basis-1/3 text-center">Actions</div>
        </div>
        <div className=" flex  flex-col divide-y  divide-border-2">
          <DataLoader
            data={alldeleted.map((item, index) => {
              return <TableRow index={index} item={item} key={item._id} />;
            })}
            isLoading={isloading}
          />
        </div>
      </div>
    </div>
  );
}

function TableRow({ index, item }) {
  const { category, hiddenAt, _id } = item;
  const keyMap = {
    class: {
      queryKey: 'classes',
      displayKeys: ['subject', 'grade', 'hall', 'day', 'startTime', 'duration'],
    },
    teacher: { queryKey: 'teachers', displayKeys: ['name', 'subject', 'phone'] },
    student: {
      queryKey: 'students',
      displayKeys: ['studentId', 'name', 'status', 'phone'],
    },
  };
  const { mutate: restore, isPending } = useRestore(keyMap[category].queryKey);

  function onRestore() {
    restore({ endPoit: `${keyMap[category].queryKey}/hide`, idList: [_id] });
  }
  return (
    <div className="py-2 text-sm">
      <div className="flex items-center ">
        <div className="basis-2/3 flex-col">
          <div className=" flex py-2">
            <div className=" basis-14 pl-4 text-text--muted">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div className=" basis-1/2 font-medium capitalize">{category}</div>
            <div className=" basis-1/2">
              {hiddenAt ? new Date(hiddenAt).toLocaleString() : '----------'}
            </div>
          </div>
          <div className=" flex flex-wrap gap-2 px-4">
            {keyMap[category].displayKeys.map((key) => {
              return (
                <div
                  key={key}
                  className="flex gap-2 rounded-md border border-border-3 px-3 py-1 capitalize"
                >
                  <div className="capitalize">{key}</div>:<div>{item[key]}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" basis-1/3">
          <div className="flex w-full items-center justify-center gap-6">
            <Button
              onClick={onRestore}
              className="border-none bg-green-600 hover:bg-green-700"
              size="sm"
              spinner={isPending}
              icon="cycle"
              label="RESTORE"
            />
            <Button size="sm" icon="delete" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletedTable;
