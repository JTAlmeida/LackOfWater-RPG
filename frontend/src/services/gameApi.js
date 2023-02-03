import api from './api';

export async function getScenes(token) {
  const response = await api.get('/scene', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getEnemies(token) {
  const response = await api.get('/enemy', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getItems(token) {
  const response = await api.get('/item', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
