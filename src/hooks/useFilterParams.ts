import { SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const useFilterParams = () => {
  const [params, setParams] = useSearchParams();
  return (e: SelectChangeEvent<string>, category: string) => {
    if (e.target.value === "") {
      params.delete(category);
      params.delete("page");
      setParams(params);
    } else {
      setParams((params) => {
        params.set(category, String(e.target.value));
        params.delete("page");
        return params;
      });
    }
  };
};
