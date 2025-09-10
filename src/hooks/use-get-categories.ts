import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`, {
        withCredentials: true,
      })
      return data
    },
  })

  return query
}
