const URL = "https://timeapi.io/api";

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`API Hatası (${res.status}): ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("❌ API Çağrısı Hatası:", err);
    throw new Error(`Ağ veya API Hatası: ${(err as Error).message}`);
  }
}

export async function getTimezones(): Promise<string[]> {
  return await fetchApi<string[]>("/TimeZone/AvailableTimeZones");
}

export async function getTime(timezone: string): Promise<any> {
  return await fetchApi<any>(`/Time/current/zone?timeZone=${timezone}`);
}
