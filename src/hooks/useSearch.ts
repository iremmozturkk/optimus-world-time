import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  const filter = (data: string[]): string[] =>
    data.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return { search, setSearch, filter }; 
};

