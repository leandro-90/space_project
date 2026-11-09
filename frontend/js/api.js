import { API_BASE_URL } from "./config.js";

const request = async (path) => {
  const res = await fetch(`${API_BASE_URL}${path}`);

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error.message);
  }

  return res.json();
};

// interno: transforma um caminho em URL completa
const toFullUrl = (path) => new URL(path, API_BASE_URL).href;

// interno: completa os caminhos de imagem de um item
const withFullImageUrls = (item) => {
  const updated = { ...item };

  if (item.images) {
    updated.images = Object.fromEntries(
      Object.entries(item.images).map(([key, path]) => [key, toFullUrl(path)]),
    );
  }

  if (item.image) {
    updated.image = toFullUrl(item.image);
  }

  return updated;
};

export const getPlanets = async () => {
  const planets = await request("/api/planets");
  return planets.map(withFullImageUrls);
};

export const getStars = async () => {
  const stars = await request("/api/stars");
  return stars.map(withFullImageUrls);
};
