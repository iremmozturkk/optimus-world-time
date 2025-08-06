const BASE_URL = "https://timeapi.io/api";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return res.json();
}

export async function getTimezones(): Promise<string[]> {
  return fetchApi<string[]>("/TimeZone/AvailableTimeZones");
}

export async function getTime(timezone: string): Promise<any> {
  return fetchApi<any>(`/Time/current/zone?timeZone=${timezone}`);
}
