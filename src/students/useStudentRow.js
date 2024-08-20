import { useContext, useEffect, useRef, useState } from "react";
import useUpdateStudent from "./useUpdateStudent";
import useDeleteStudent from "./useDeleteStudent";
import { StdTableContext } from "./TableContext";

export default function useStudentRow(student) {
    const { _id, name, phone } = student;
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState({ name, phone });
    const [isSelected, setIsSelected] = useState(false);
    const ref1 = useRef();
  
    const { updateSelectedList, state } = useContext(StdTableContext);
    const { isUpdating, isSuccess, mutate } = useUpdateStudent();
    const { isDeleting, mutate: deleteStudent } = useDeleteStudent();
  
    useEffect(() => {
      setIsSelected(state.selectedList?.includes(_id));
    }, [state.selectedList, _id]);
  
    useEffect(() => {
      if (isEditing) ref1.current.focus();
    }, [isEditing]);
  
    useEffect(() => {
      if (isSuccess) setIsEditing(false);
    }, [isSuccess]);
  
    const onStatusHandler = (selected) => {
      mutate({ studentId: _id, newData: { status: selected } });
    };
  
    const onSubmitHandler = () => {
      mutate({
        studentId: _id,
        newData: {
          name: formState.name,
          phone: formState.phone,
        },
      });
    };
  
    const onAddhandler = () => {
      updateSelectedList('add', _id);
    };
  
    const onRemoveHandler = () => {
      updateSelectedList('remove', _id);
    };
  
    const onSelectHandler = (selected) => {
      if (selected === 'update') {
        setIsEditing(!isEditing);
      }
      if (selected === 'delete') {
        deleteStudent(_id);
      }
    };
  
    return {
      ref1,
      isEditing,
      setIsEditing,
      formState,
      setFormState,
      isSelected,
      onStatusHandler,
      onSubmitHandler,
      onAddhandler,
      onRemoveHandler,
      onSelectHandler,
      isUpdating,
      isDeleting,
      state,
    };
  }