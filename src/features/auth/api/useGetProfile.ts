import { getUserProfile } from "@/apis/internal.api";
import { getItem } from "@/libs/async-storage";
import { useQuery } from "@tanstack/react-query";

import { useAccessToken, useAuthActions } from "../store/auth-store";

export const useGetProfile = () => {
  const accessToken = useAccessToken();
  const { setProfile } = useAuthActions();

  return useQuery({
    queryKey: ["useGetProfile", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserProfile(),
    enabled: !!accessToken,
  });
};
