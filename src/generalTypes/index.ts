import { AxiosError } from "axios";

export type TAxiosResponseError = AxiosError<{
  message: string;
  error: string;
  statusCode: number;
}>;

export type TMutationParams = {
  onSuccess: () => void;
  onError: (error: TAxiosResponseError) => void;
};

export type TPaginationData = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  remainingCount: number;
  totalCount: number;
  totalPages: number;
};
