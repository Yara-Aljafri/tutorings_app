/**
 * The client for the Phoenix JSON API.
 *
 * Every screen is usable without the server: `useContent` hands back the
 * bundled copy of the content first and replaces it if the request succeeds.
 */

import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

/**
 * Point the app at a server with `EXPO_PUBLIC_API_URL`. Without it we assume
 * Phoenix runs on port 4000 of whichever host is serving the bundle, which is
 * what `mix phx.server` next to `npx expo start` gives you.
 */
function inferBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL;
  if (configured) return configured.replace(/\/$/, '');

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) return `http://${hostUri.split(':')[0]}:4000`;

  return 'http://localhost:4000';
}

export const API_BASE_URL = inferBaseUrl();

export async function getJSON<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export type ContentState<T> = {
  data: T;
  /** True until the first request settles, one way or the other. */
  loading: boolean;
  /** Set when the request failed and `data` is the bundled fallback. */
  offline: boolean;
};

/**
 * Fetches `path`, falling back to `fallback` when the server cannot be
 * reached. `path` doubles as the cache key, so passing a query string is fine.
 */
export function useContent<T>(path: string, fallback: T): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({
    data: fallback,
    loading: true,
    offline: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setState({ data: fallback, loading: true, offline: false });

    getJSON<T>(path, controller.signal)
      .then((data) => {
        if (active) setState({ data, loading: false, offline: false });
      })
      .catch((error) => {
        if (!active || controller.signal.aborted) return;
        console.warn(`[api] ${error.message ?? error} — showing bundled content`);
        setState({ data: fallback, loading: false, offline: true });
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}
