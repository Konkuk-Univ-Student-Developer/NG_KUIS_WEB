import { useState, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { getHomeData, type HomeDataResponse } from "@/api/homeApi";

export const useHomeData = () => {
  const { isLoggedIn } = useAuthStore();

  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getHomeData();
        setHomeData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch home data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return { homeData, isLoading, error };
};
