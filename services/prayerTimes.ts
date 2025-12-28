
export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface PrayerData {
  timings: PrayerTimings;
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string; ar: string };
      year: string;
    };
  };
  meta: {
    timezone: string;
  };
}

export const fetchPrayerTimes = async (lat: number, lng: number): Promise<PrayerData> => {
  const response = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
  );
  const data = await response.json();
  if (data.code !== 200) throw new Error("Failed to fetch prayer times");
  return data.data;
};

export const getNextPrayer = (timings: PrayerTimings): { name: string; time: string } | null => {
  const now = new Date();
  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  for (const name of prayerNames) {
    const [hours, minutes] = timings[name as keyof PrayerTimings].split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);
    
    if (prayerTime > now) {
      return { name, time: timings[name as keyof PrayerTimings] };
    }
  }
  
  // If all prayers today have passed, return Fajr for tomorrow (simplified for UI)
  return { name: "Fajr", time: timings.Fajr };
};
