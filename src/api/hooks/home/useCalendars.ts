import { useState, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { getCalendars, type CalendarItem } from "@/types/home";

export const useCalendars = () => {
  const { isLoggedIn } = useAuthStore();

  const [calendars, setCalendars] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      if (!isLoggedIn) {
        setCalendars([]); // 로그아웃 시 데이터 초기화
        return;
      }

      try {
        const data = await getCalendars();
        setCalendars(data);
      } catch (err) {
        console.error("Failed to fetch calendars:", err);
      }
    };

    fetchCalendars();
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 데이터를 다시 가져옵니다.

  return { calendars };
};
