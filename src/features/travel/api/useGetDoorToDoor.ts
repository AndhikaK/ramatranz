import { getDoorToDoorPoint } from "@/apis/internal.api";
import { TravelDoorToDoorParams } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetDoorToDoor = (params: TravelDoorToDoorParams) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetDoorToDoor", params],
    queryFn: () => getDoorToDoorPoint(params),
    enabled: !!accessToken && !!params,
  });
};
