import { getItem } from "@/libs/async-storage";
import { useQuery } from "@tanstack/react-query";

import { useAccessToken, useAuthActions } from "../store/auth-store";

export const useGetProfile = () => {
  const accessToken = useAccessToken();
  const { setProfile } = useAuthActions();

  return useQuery({
    queryKey: ["useGetProfile"],
    // TODO replace with actual get Profile API
    queryFn: async () => {
      const storageProfile = await getItem("profile");

      if (storageProfile) {
        setProfile(storageProfile);
        return storageProfile;
      } else {
        throw {
          message: "Unauthorized",
        };
      }
    },
    enabled: !!accessToken,
  });
};
