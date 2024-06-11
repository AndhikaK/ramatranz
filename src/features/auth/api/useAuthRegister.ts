import { postRegister } from "@/apis/internal.api";
import { PostRegisterPayload } from "@/apis/internal.api.type";
import { useMutation } from "@tanstack/react-query";

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: (payload: PostRegisterPayload) => postRegister(payload),
  });
};
