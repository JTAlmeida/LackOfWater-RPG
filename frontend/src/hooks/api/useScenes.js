import useAsync from '../useAsync';
import useToken from '../useToken';
import * as gameApi from '../../services/gameApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: scenes,
    loading: scenesLoading,
    error: scenesError,
    act: getScenes,
  } = useAsync(() => gameApi.getScenes(token));

  return {
    scenes,
    scenesLoading,
    scenesError,
    getScenes,
  };
}
