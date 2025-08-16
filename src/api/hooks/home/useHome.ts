import { useState, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { type HomeDataResponse } from "@/types/home";
import { http } from "@/api/fetch";

export const getHomeData = async (): Promise<HomeDataResponse> => {
  const { response } = await http.get<HomeDataResponse>(`/api/v1/home`);
  return response;
};

export const useHomeData = () => {
  const { isLoggedIn } = useAuthStore();

  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const data = await getHomeData();
        setHomeData(data);
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return { homeData };
};
