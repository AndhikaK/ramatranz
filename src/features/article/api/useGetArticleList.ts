import { AxiosError } from "axios";

import { getArticles } from "@/apis/internal.api";
import { GetArticleQuery } from "@/apis/internal.api.type";
import { useAccessToken } from "@/features/auth/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleList = (query?: GetArticleQuery) => {
  const accessToken = useAccessToken();

  return useQuery(
    // <{}, AxiosError>
    {
      queryKey: ["useGetArticleList", accessToken, query?.type],
      queryFn: () => getArticles(query),
      enabled: !!accessToken,
    }
  );
};
