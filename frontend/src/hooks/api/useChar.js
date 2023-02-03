import useAsync from '../useAsync';
import useToken from '../useToken';
import * as charApi from '../../services/charApi';

export default function useChar() {
  const token = useToken();

  const {
    data: char,
    loading: charLoading,
    error: charError,
    act: getChar,
  } = useAsync(() => charApi.getChar(token));

  return {
    char,
    charLoading,
    charError,
    getChar,
  };
}
