import { ApiResponse } from "@/types/api-response";
import { ApiError } from "./api-error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type ApiOptions = RequestInit & {
  params?: Record<string, any>;
  responseType?: "json" | "blob";
};

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, responseType = "json", ...init } = options;

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

    const data =
      responseType === "blob"
        ? await res.blob()
        : await res.json();

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

export type ApplicationMeta = {
  doctorsCount: number;
  specialtiesCount: number;
  totalDoctorsAvgRatings: number;
  patientsCount: number;
  appointmentsCount: number;
};

export async function getApplicationMetadata() {
  try {
    return await api<ApiResponse<ApplicationMeta>>("/meta/app", {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 60 * 10,
        tags: ["application-metadata"],
      },
    });
  } catch (error) {
    console.error("Application metadata error:", error);
    return null;
  }
}
