"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

function useQueryManager() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const getQuery = (key: string) => {
    return params.get(key);
  };

  const getAllQueries = () => {
    return Object.fromEntries(params.entries());
  };

  const setQuery = (key: string, value?: string) => {
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const clearQuery = () => {
    router.replace(pathname);
  };
  return { setQuery, getQuery,getAllQueries, clearQuery };
}
export default useQueryManager;