import { useState, useEffect } from "react";
import type { CalendarItem, CalendarResponse } from "@/types/home";
import { http } from "@/api/fetch";

export const getCalendars = async (): Promise<CalendarResponse> => {
  const { response } = await http.get<CalendarResponse>(`/api/v1/calendars`);
  return response;
};

export const useCalendars = () => {
  const [calendars, setCalendars] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const data = await getCalendars();
        setCalendars(data);
      } catch (err) {
        console.error("Failed to fetch calendars:", err);
      }
    };

    fetchCalendars();
  }, []);

  return { calendars };
};
