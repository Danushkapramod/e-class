import { useContext, useEffect, useRef, useState } from "react";
import useUpdateStudent from "./useUpdateStudent";
import { StdTableContext } from "./TableContext";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateStatus } from "./useUpdateStatus";
import { useDispatch } from "react-redux";
import { setDeleteConfirmation } from "../GlobalUiState";

export default function useStudentRow(student) {
    const { _id, name, phone } = student;
    const ref1 = useRef();
    const {id} = useParams()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState({ name, phone });
    const [isSelected, setIsSelected] = useState(false);
    const { updateSelectedList, state} = useContext(StdTableContext);
    const { isUpdating, isSuccess, mutate } = useUpdateStudent();
    const {  mutate: updateStatus } = useUpdateStatus();
  
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
      updateStatus({ studentIds: [_id], newData: { status: selected },classId:id });
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
        navigate(`/app/students/${_id}/update`)
      }
      if (selected === 'delete') {
        dispatch(setDeleteConfirmation(_id));
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
      state,
    };
  }