import api from './api';

export async function getChar(token) {
  const response = await api.get('/character', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createChar(body, token) {
  const response = await api.post('/character', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateChar(body, characterId, token) {
  const response = await api.put(`/character/${characterId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function upsertCharItem(body, characterId, itemId, token) {
  const response = await api.put(`/character/${characterId}/${itemId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
