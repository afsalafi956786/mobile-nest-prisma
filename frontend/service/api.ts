"use client";

const BASE_URL = "http://localhost:8000/api";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

type FetchOptions = RequestInit & {
  params?: Record<string, any>;
};

/* ---------------------------------- */
/* Core Request Function */
/* ---------------------------------- */

async function request(
  method: string,
  endpoint: string,
  body?: any,
  options: FetchOptions = {}
) {
  const { params, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint}`;

  /* ---------------------------------- */
  /*  Build query string automatically */
  /* ---------------------------------- */

  if (params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      // skip empty values
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  /* ---------------------------------- */
  /* Fetch */
  /* ---------------------------------- */

  const res = await fetch(url, {
    method,
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOptions,
  });

  /* ---------------------------------- */
  /* Response Handling */
  /* ---------------------------------- */

  if (res.status === 204) return null;

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "API request failed");
  }

  return res.json();

}

/* ---------------------------------- */
/* API Wrapper */
/* ---------------------------------- */

export const apiFetch = {
  get: (endpoint: string, options?: FetchOptions) =>
    request("GET", endpoint, undefined, options),

  post: (endpoint: string, body: any, options?: FetchOptions) =>
    request("POST", endpoint, body, options),

  put: (endpoint: string, body: any, options?: FetchOptions) =>
    request("PUT", endpoint, body, options),

  delete: (endpoint: string, options?: FetchOptions) =>
    request("DELETE", endpoint, undefined, options),
};
