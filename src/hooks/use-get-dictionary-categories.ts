import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDictionaryCategories = () => {
  const query = useQuery({
    queryKey: ["dictionary-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dictionary_categories`,
        { withCredentials: true }
      );
      return data;
    },
  });

  return query;
};
