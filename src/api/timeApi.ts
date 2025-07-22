export async function getTimezones(): Promise<string[]> {
  const res = await fetch("https://timeapi.io/api/TimeZone/AvailableTimeZones");
  if (!res.ok) throw new Error("Failed to fetch timezones");
  return res.json();
}

export async function getTime(timezone: string): Promise<{
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  date: string;
  time: string;
  timeZone: string;
}> {
  const res = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`
  );
  if (!res.ok) throw new Error("Failed to fetch time");
  return res.json();
}
