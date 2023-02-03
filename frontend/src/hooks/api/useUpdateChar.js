import useAsync from '../useAsync';
import useToken from '../useToken';
import * as charApi from '../../services/charApi';

export default function useUpdateChar() {
  const token = useToken();

  const {
    loading: updateCharLoading,
    error: updateCharError,
    act: updateChar,
  } = useAsync((data, characterId) => charApi.updateChar(data, characterId, token), false);

  return {
    updateChar,
    updateCharLoading,
    updateCharError,
  };
}
