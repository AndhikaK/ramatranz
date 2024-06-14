import { getTravelSchedule } from "@/apis/internal.api";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetTravelSchedule = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetSchedule"],
    queryFn: () => getTravelSchedule(),
    enabled: !!accessToken,
  });
};
