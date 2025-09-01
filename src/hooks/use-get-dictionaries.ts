import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useGetDictionaries = (
  translationType: 'uk_la' | 'la_uk',
  selectedLetter: string | null,
  search: string
) => {
  const query = useQuery({
    queryKey: ['dictionary', { selectedLetter, translationType, search }],
    queryFn: async () => {
      let path = '/dictionary'
      let queryParams = '?limit=100000'

      if (selectedLetter) {
        path += `/starts-with`
        queryParams += `&t=${translationType}&l=${selectedLetter}`
      }

      if (search) {
        queryParams += `&[where][or][0][ukrainian][contains]=${search}&[where][or][1][latin][contains]=${search}`
      }

      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}${path}${queryParams}`, {
        withCredentials: true,
      })
      return data
    },
  })

  return query
}
