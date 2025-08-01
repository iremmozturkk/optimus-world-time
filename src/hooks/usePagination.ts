import { useState, useMemo, useCallback } from "react";

export function usePagination<T>(itemsPerPage: number, data: T[]) {
  const [currentPage, setCurrentPage] = useState(1);

   // Sayfa değiştirme 
  const goToPage = useCallback((page: number) => {

    const maxPage = Math.ceil(data.length / itemsPerPage) || 1;

    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    setCurrentPage(page);

  }, [data.length, itemsPerPage]);

  // Toplam sayfa
  const totalPages = useMemo(() => {

    return Math.ceil(data.length / itemsPerPage) || 1;
  }, [data.length, itemsPerPage]);

  
  const paginatedData = useMemo(() => {

    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
    
  }, [data, currentPage, itemsPerPage]);

  return { currentPage, goToPage, totalPages, paginatedData };
}
