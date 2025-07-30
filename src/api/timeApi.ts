  //https://wrongurl.test/api
  //https://timeapi.io/api/TimeZone/AvailableTimeZones
 
// Zaman dilimleri API'si
export async function getTimezones(): Promise<string[]> {
  try {
    const res = await fetch("https://timeapi.io/api/TimeZone/AvailableTimeZones");
    if (!res.ok) {
      throw new Error(`API Hatası (${res.status}): ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    throw new Error(`Ağ veya API Hatası: ${(err as Error).message}`);
  }
}

// Belirli zaman dilimi API'si
export async function getTime(timezone: string): Promise<any> {
  try {
    const res = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`);
    if (!res.ok) {
      throw new Error(`API Hatası (${res.status}): ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    throw new Error(`Ağ veya API Hatası: ${(err as Error).message}`);
  }
}

