import useAsync from '../useAsync';
import useToken from '../useToken';
import * as gameApi from '../../services/gameApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: enemies,
    loading: enemiesLoading,
    error: enemiesError,
    act: getEnemies,
  } = useAsync(() => gameApi.getEnemies(token));

  return {
    enemies,
    enemiesLoading,
    enemiesError,
    getEnemies,
  };
}
