import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetExerciseCategories = (type: "test" | "card") => {
  const query = useQuery({
    queryKey: ["exercise-categories", { type }],
    queryFn: async () => {
      let queryParams = "?limit=1000&depth=1";

      if (type) {
        queryParams += `&[where][or][0][type][equals]=${type}`;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/exercise_categories${queryParams}`,
        { withCredentials: true }
      );
      return data;
    },
  });

  return query;
};
