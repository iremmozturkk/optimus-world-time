// src/hooks/usePagination.ts
import { useState } from "react";

export const usePagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = <T,>(data: T[]): T[] => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const totalPages = (dataLength: number) =>
    Math.ceil(dataLength / itemsPerPage);

  return { currentPage, setCurrentPage, paginate, totalPages };
};
