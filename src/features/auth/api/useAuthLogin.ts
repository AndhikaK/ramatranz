import { useMutation } from "react-query";

import { postLogin } from "@/apis/internal.api";
import { PostLoginPayload } from "@/apis/internal.api.type";

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: (payload: PostLoginPayload) => postLogin(payload),
  });
};
