import useAsync from '../useAsync';
import useToken from '../useToken';
import * as charApi from '../../services/charApi';

export default function useUpsertCharItem() {
  const token = useToken();

  const {
    loading: upsertCharItemLoading,
    error: upsertCharItemError,
    act: upsertCharItem,
  } = useAsync((data, characterId, itemId) => charApi.upsertCharItem(data, characterId, itemId, token), false);

  return {
    upsertCharItem,
    upsertCharItemLoading,
    upsertCharItemError,
  };
}
