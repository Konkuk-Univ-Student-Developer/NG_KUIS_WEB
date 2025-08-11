const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 기본 fetch 함수
 * @param url RequestInfo - API 엔드포인트
 * @param init RequestInit - fetch 옵션
 * @returns Promise<{ response: T }>
 */
const baseFetch = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers, 
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  return { response: json };
};

/**
 * HTTP 메서드를 편리하게 사용하기 위한 객체
 */
const http = {
  get: async <T = unknown>(url: string, params?: Record<string, string>) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return baseFetch(`${url}${queryString}`, {
      method: "GET",
    }) as Promise<{ response: T }>;
  },

  post: async <T = unknown>(url: string, body?: unknown) => {
    return baseFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    }) as Promise<{ response: T }>;
  },

  put: async <T = unknown>(url: string, body?: unknown) => {
    return baseFetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }) as Promise<{ response: T }>;
  },

  delete: async <T = unknown>(url: string) => {
    return baseFetch(url, {
      method: "DELETE",
    }) as Promise<{ response: T }>;
  },
};

export { http };
