import ENDPOINTS from './endpoints.json';

const { VITE_API_BASE_URL } = import.meta.env;

export const getHostByServerName = (serverName: string): string => {
  switch (serverName) {
    case 'API':
      return VITE_API_BASE_URL;
    default:
      return '';
  }
};

const applyPathParams = (path: string, params?: Record<string, string | number>) => {
  if (!params) return path;

  return path.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = params[key];
    return v === undefined || v === null ? `{${key}}` : encodeURIComponent(String(v));
  });
};

export const getEndpointSet = (
  serverName: keyof typeof ENDPOINTS,
  domain: keyof (typeof ENDPOINTS)[keyof typeof ENDPOINTS],
  params?: Record<string, string | number>
) => {
  const host = getHostByServerName(serverName);
  const { path, method } = ENDPOINTS[serverName][domain];

  return {
    url: `${host}${applyPathParams(path, params)}`,
    method,
  };
};
