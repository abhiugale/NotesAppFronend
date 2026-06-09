import { useState } from "react";
import { PaginationMetadata } from "../types";

export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const setPaginationData = (pagination: PaginationMetadata | null | undefined) => {
    if (pagination) {
      setTotal(pagination.total || 0);
      setTotalPages(pagination.totalPages || 0);
      setPage(pagination.page || 1);
      setLimit(pagination.limit || 10);
    }
  };

  const resetPage = () => setPage(1);

  return {
    page,
    limit,
    total,
    totalPages,
    setPage,
    setLimit,
    setPaginationData,
    resetPage,
  };
}
