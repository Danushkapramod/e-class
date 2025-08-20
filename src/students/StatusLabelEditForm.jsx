import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { statusOptionsDefault } from '../services/apiAuth';
import { StdTableContext } from './TableContext';
import useUpdateAppSetings from '../user/useUpdateAppSetings';
import { Controller, Form, useForm } from 'react-hook-form';
import { Button } from '../ui/components/ButtonNew';
import useAppSetings from '../user/useAppSetings';

export default function StatusForm() {
  const queryClient = useQueryClient();
  const { mutate: setDefaultStatus, isPending: defalting } = useMutation({
    mutationFn: statusOptionsDefault,
  });
  const { updateStatusForm, state } = useContext(StdTableContext);
  const { data, isLoading } = useAppSetings();
  const { mutate, isPending } = useUpdateAppSetings();
  const { setFocus, handleSubmit, control } = useForm();
  const [tempStatusList, setTempStatusList] = useState();

  useEffect(() => setFocus('name'), [setFocus]);

  useEffect(() => {
    if (isLoading) return;
    setTempStatusList(data.students.statusOptions);
  }, [data, isLoading]);

  function onSubmit() {
    mutate({ students: { statusOptions: tempStatusList } });
  }
  async function onDefault(e) {
    await e.preventDefault();
    setDefaultStatus(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries('appSettings');
        },
      }
    );
  }

  if (!state.statusFormIsOpen) return null;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      className=" flex flex-col gap-2 border-t border-bg--primary-100 px-2 py-2"
    >
      <div className=" pl-1 text-sm uppercase text-text--secondery">Edit payment labels</div>
      <div className=" flex justify-between ">
        <div className=" flex flex-wrap items-start gap-2">
          <AddStatus tempList={tempStatusList} setTempList={setTempStatusList} />
          <Button
            spinner={defalting}
            onClick={onDefault}
            variant="outline"
            size="sm"
            label="Default"
          />
          {tempStatusList &&
            tempStatusList.map((option) => (
              <StatusOption
                key={option.option}
                tempList={tempStatusList}
                setTempList={setTempStatusList}
                control={control}
                option={option}
              />
            ))}
        </div>

        <div className=" flex items-center gap-3 ">
          <Button spinner={isPending} type="primary" label="SUBMIT" />
          <button
            onClick={(e) => {
              e.preventDefault();
              updateStatusForm(false);
            }}
            className=" material-symbols-outlined flex aspect-square h-8 
            items-center justify-center rounded-full bg-bg--primary-300 text-lg"
          >
            close
          </button>
        </div>
      </div>
    </Form>
  );
}

function AddStatus({ setTempList, tempList }) {
  const [value, setValue] = useState();

  function onSubmit(e) {
    e.preventDefault();
    setTempList([...tempList, { option: value, color: '' }]);
  }

  return (
    <div className=" flex gap-2">
      <input
        name="status"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Status"
        className="rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
        type="text"
      />
      <Button onClick={onSubmit} size="sm" label="ADD" icon="add" variant="outline" />
    </div>
  );
}

function StatusOption({ option: { option, color }, control, setTempList, tempList }) {
  const [_color, setColor] = useState(color);

  useEffect(() => {
    const newList = tempList.map((item) => {
      if (item.option === option) {
        return { option, color: _color };
      } else {
        return item;
      }
    });

    setTempList(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_color, option]);

  function deleteHandler(e) {
    e.preventDefault();
    setTempList(tempList.filter((item) => item.option !== option));
  }
  return (
    <div
      style={{
        backgroundColor: _color,
        border: '1px solid',
        borderColor: _color || 'var(--color-border-2)',
      }}
      className=" flex items-center gap-1 rounded px-2  pl-3 text-sm capitalize"
    >
      {option}
      <div className="flex items-center">
        <label
          htmlFor={option}
          className="material-symbols-outlined flex scale-[70%] 
            items-center justify-center rounded-full p-0.5 hover:scale-75"
        >
          format_color_fill
        </label>
        <Controller
          id={option}
          name={option}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="h-0 w-0 opacity-0"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              type="color"
              name={option}
              id={option}
            />
          )}
        />
        <button
          onClick={deleteHandler}
          className="material-symbols-outlined flex scale-[70%]
            items-center justify-center rounded-full p-0.5  hover:scale-75"
        >
          delete
        </button>
      </div>
    </div>
  );
}
