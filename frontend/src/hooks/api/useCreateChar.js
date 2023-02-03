import useAsync from '../useAsync';
import useToken from '../useToken';
import * as charApi from '../../services/charApi';

export default function useCreateChar() {
  const token = useToken();

  const {
    loading: createCharLoading,
    error: createCharError,
    act: createChar,
  } = useAsync((data) => charApi.createChar(data, token), false);

  return {
    createChar,
    createCharLoading,
    createCharError,
  };
}
