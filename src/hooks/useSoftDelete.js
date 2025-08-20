import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { hideItem } from '../services/apiAuth';

function useSoftDelete({ delQueryKey, queryKey }) {
  const [visible, setVisible] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: hideItem,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries({ queryKey: [delQueryKey] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  return { hideDialog, showDialog, visible, mutate, isPending };
}

export default useSoftDelete;
