import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetExercises = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["exercise", { id }],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/exercise/${id}`,
        { withCredentials: true }
      );
      return data;
    },
  });

  return query;
};
