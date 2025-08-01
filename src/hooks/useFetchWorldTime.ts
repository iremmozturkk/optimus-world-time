import { useQuery } from "@tanstack/react-query";
import { getTimezones, getTime } from "../api/timeApi";
import { useState, useEffect } from "react";

export function useFetchWorldTime(zone: string) {

  const [timezones, setTimezones] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<any>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({

    queryKey: ["worldTimeData", zone],

    queryFn: async () => {

      if (zone) {

        const cityTime = await getTime(zone);
        return { timezones: [], currentTime: cityTime };

      } else {

        const [zones, defaultTime] = await Promise.all([
          getTimezones(),
          getTime("Europe/Istanbul")
        ]);

        return { timezones: zones, currentTime: defaultTime };
      }
    },

    staleTime: Infinity,
    refetchInterval: Infinity,

  });

  // data'yı state'e aktarma
  useEffect(() => {
    
    if (data) {
      setTimezones(data.timezones || []);
      setCurrentTime(data.currentTime || null);
    }

  }, [data]);

  return {
    timezones,
    currentTime,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
