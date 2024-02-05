import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [params, setParams] = useSearchParams();
  const page = +(params.get("page") || "1");
  const changePage = (_: React.ChangeEvent<unknown>, newPage: number) =>
    setParams((params) => {
      params.set("page", String(newPage));
      return params;
    });

  return [page, changePage] as const;
};
