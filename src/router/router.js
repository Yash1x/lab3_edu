/*
 * Минимальный hash-роутер на стандартном React (без react-router).
 * Адреса вида #/lecturers/petrov работают на любом статическом хостинге,
 * включая Yandex Object Storage, без настройки сервера.
 */
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

const getHash = () => window.location.hash;

export function useLocation() {
  const hash = useSyncExternalStore(subscribe, getHash);
  const [pathname, search = ''] = (hash.slice(1) || '/').split('?');
  return { pathname, query: new URLSearchParams(search) };
}

export function navigate(to) {
  window.location.hash = to;
}

// Сопоставляет путь с шаблонами вида '/lecturers/:id'
export function matchRoute(routes, pathname) {
  const parts = pathname.split('/').filter(Boolean);

  for (const route of routes) {
    const pattern = route.path.split('/').filter(Boolean);
    if (pattern.length !== parts.length) continue;

    const params = {};
    const matched = pattern.every((segment, i) => {
      if (segment.startsWith(':')) {
        params[segment.slice(1)] = decodeURIComponent(parts[i]);
        return true;
      }
      return segment === parts[i];
    });

    if (matched) return { route, params };
  }
  return null;
}
