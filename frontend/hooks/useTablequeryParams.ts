"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useTableQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const updateParams = useCallback(
    (params: Record<string, any>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) newParams.delete(key);
        else newParams.set(key, String(value));
      });

      router.replace(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  return {
    page,
    limit,
    search,
    setPage: (p: number) => updateParams({ page: p }),
    setLimit: (l: number) => updateParams({ limit: l, page: 1 }),
    setSearch: (s: string) => updateParams({ search: s, page: 1 }),
  };
};
