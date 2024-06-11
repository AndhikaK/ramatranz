import { useMutation } from "react-query";

import { postRegister } from "@/apis/internal.api";
import { PostRegisterPayload } from "@/apis/internal.api.type";

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: (payload: PostRegisterPayload) => postRegister(payload),
  });
};
