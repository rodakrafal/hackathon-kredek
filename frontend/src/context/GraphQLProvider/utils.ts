export interface Props {
  children: React.ReactNode;
}

export const isDev = true;
export const PORT = process.env.REACT_APP_PORT || 4000;
export const host =
  process.env.REACT_APP_BACKEND_URL ||
  (isDev ? `http://localhost:${PORT}` : window.location.origin);
