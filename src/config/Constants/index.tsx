export const BACKEND_API_ROOT =
  process.env.NEXT_PUBLIC_API_UR || "http://localhost:5000";

export const UPLOAD_API_ROOT = `${BACKEND_API_ROOT}/upload`;
export const AUTH_DETAILS = "AUTH_DETAILS";
export const imageHost = BACKEND_API_ROOT;
