import useSWR from "swr";
import { API_HOST } from "home/src/utils/constants";
import type { Product } from "home/src/types/types";

export const useProducts = () => {
  const { data = [], error, isLoading } = useSWR<Product[]>(API_HOST);
  return { data, error, isLoading };
};
