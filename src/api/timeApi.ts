
// Tüm zaman dilimlerini API'den almak için getTimezones() fonksiyonu
export async function getTimezones(): Promise<string[]> {
  //API isteği gönderiliyor
  const res = await fetch("https://timeapi.io/api/TimeZone/AvailableTimeZones");
  //Eğer başarısızsa hata
  if (!res.ok) throw new Error("Failed to fetch timezones");
  //Yanıtı JSON formatına çevirip döndür
  return res.json();
}
//Belirli bir zaman dilimindeki saat bilgilerini almak için fonksiyon getTime()
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
  // timezone'a göre API isteği gönderiliyor
  const res = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`
  );
  //Başarısız ise hata
  if (!res.ok) throw new Error("Failed to fetch time");
  //JSON formatına çevir döndür
  return res.json();
}
