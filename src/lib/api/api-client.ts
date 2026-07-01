import { ApiError } from "./api-error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function api<T>(
  path: string,
  options: RequestInit & { params?: Record<string, any> } = {},
): Promise<T> {
  const { params, ...init } = options;

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v != null) url.searchParams.set(k, String(v));
    });
  }
  try {
    const res = await fetch(url.toString(), {
      ...init,
      headers: {
        ...(init.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...init.headers,
      },
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) { 
      throw new ApiError(res.status, data?.message ?? res.statusText);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(0, error.message);
    }

    throw new ApiError(
      0,
      "Network error. Please check your internet connection.",
    );
  }
}
