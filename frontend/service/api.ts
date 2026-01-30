"use client";

const BASE_URL = "http://127.0.0.1:8000/api";
async function request(
  method: string,
  endpoint: string,
  body?: any,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (res.status === 204) return null;

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "API request failed");
  }

  return res.json();
}

export const apiFetch = {
  get: (endpoint: string, options?: RequestInit) =>
    request("GET", endpoint, undefined, options),

  post: (endpoint: string, body: any, options?: RequestInit) =>
    request("POST", endpoint, body, options),

  put: (endpoint: string, body: any, options?: RequestInit) =>
    request("PUT", endpoint, body, options),

  delete: (endpoint: string, options?: RequestInit) =>
    request("DELETE", endpoint, undefined, options),
};
