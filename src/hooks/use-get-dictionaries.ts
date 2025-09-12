import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDictionaries = (
  translationType: "uk_la" | "la_uk",
  selectedLetter: string | null,
  search: string,
  selectedCategory: number | null
) => {
  const query = useQuery({
    queryKey: [
      "dictionary",
      { selectedLetter, translationType, search, selectedCategory },
    ],
    queryFn: async () => {
      let path = "/dictionary";
      let queryParams = "?limit=100000";

      if (selectedLetter !== "all") {
        path += `/starts-with`;
        queryParams += `&t=${translationType}&l=${selectedLetter}`;
      }

      if (search) {
        queryParams += `&[where][or][0][ukrainian][contains]=${search}&[where][or][1][latin][contains]=${search}`;
      }

      if (selectedCategory) {
        const index = search ? 2 : 0;
        queryParams += `&[where][or][${index}][category][equals]=${selectedCategory}`;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${path}${queryParams}`,
        { withCredentials: true }
      );
      return data;
    },
  });

  return query;
};
