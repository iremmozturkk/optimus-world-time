import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTimezones, getTime } from "../api/timeApi";

export function useFetchWorldTime(zone?: string) {

  const queryClient = useQueryClient();

  // State'ler
  const [timezones, setTimezones] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<any>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({

    queryKey: ["worldTimeData", zone || "homeData"],

    /* 
      Prefix:"worldTimeData"
      Eğer zone varsa → örn. ["worldTimeData", "Europe/London"]
      Eğer zone yoksa → ["worldTimeData", "homeData"]
    */

    queryFn: async () => {

      if (zone) {
        // CityDetail için sadece şehir saati çekiyoruz
        const fetchedCityTime = await getTime(zone);

        // Home’dan cache edilmiş timezones verisini alıyoruz
        const cachedHomeData = queryClient.getQueryData<{ timezones: string[]; currentTime: any }>(
          ["worldTimeData", "homeData"]
        );

        return { 
          timezones: cachedHomeData?.timezones || [], 
          currentTime: fetchedCityTime 
        };

      } else {
        //  zone seçilmezse İstanbul saati 
        const [fetchedZones, fetchedDefaultTime] = await Promise.all([
          getTimezones(),
          getTime("Europe/Istanbul")
        ]);

        return { 
          timezones: fetchedZones, 
          currentTime: fetchedDefaultTime 
        };
      }
    },

    staleTime: 1000 * 60 * 5,       // 5 dakika boyunca cache taze kalır
    refetchOnWindowFocus: false,    // Sayfa odağa geldiğinde otomatik refetch yapılmaz
  });

  //  API’den dönen veriyi state'e aktar
  useEffect(() => {
    if (data) {
      if (data.timezones?.length) setTimezones(data.timezones);
      if (data.currentTime) setCurrentTime(data.currentTime);
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
