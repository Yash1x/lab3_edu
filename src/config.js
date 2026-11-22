const PHOTO_BASE_URL = (import.meta.env.VITE_PHOTO_BASE_URL ?? '').replace(/\/+$/, '');
const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL?.trim() || 'https://storage.yandexcloud.net/rpilab2')
  .replace(/\/+$/, '');

export function photoUrl(fileName) {
  if (!fileName) return null;
  return PHOTO_BASE_URL ? `${PHOTO_BASE_URL}/${fileName}` : assetUrl(`lecturers/${fileName}`);
}

export function assetUrl(path) {
  return `${ASSET_BASE_URL}/${path}`;
}
