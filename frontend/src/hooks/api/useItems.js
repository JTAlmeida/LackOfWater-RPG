import useAsync from '../useAsync';
import useToken from '../useToken';
import * as gameApi from '../../services/gameApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: items,
    loading: itemsLoading,
    error: itemsError,
    act: getItems,
  } = useAsync(() => gameApi.getItems(token));

  return {
    items,
    itemsLoading,
    itemsError,
    getItems,
  };
}
