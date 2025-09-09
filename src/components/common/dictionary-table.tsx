import { type FC } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'

import Loader from '../icons/loader'
import type { DictionaryType, TransliterationVariantsType } from '@/types'

interface Props {
  query: UseQueryResult<any, Error>
  translationType: TransliterationVariantsType
}

const DictionaryTable: FC<Props> = ({ query, translationType }) => {
  return (
    <table className="w-full border-collapse min-h-[calc(100vh-170px)]">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-3 font-semibold text-gray-700 w-1/2">
            {translationType === 'la_uk' ? 'Латинська' : 'Українська'}
          </th>
          <th className="px-4 py-3 font-semibold text-gray-700 w-1/2">
            {translationType === 'la_uk' ? 'Українська' : 'Латинська'}
          </th>
        </tr>
      </thead>

      {!query.isFetching && !query.data.docs.length && (
        <tbody>
          <tr>
            <td colSpan={2}>
              <p className="py-6 text-center text-lg font-bold">Нічого не знайдено</p>
            </td>
          </tr>
        </tbody>
      )}

      <tbody>
        {query.isFetching ? (
          <tr>
            <td colSpan={2}>
              <p className="py-6 text-center text-lg font-bold flex justify-center">
                <Loader />
              </p>
            </td>
          </tr>
        ) : (
          <>
            {query.data?.docs.map((dict: DictionaryType) => (
              <tr key={dict.id} className="hover:bg-gray-50 transition-colors border-b last:border-0 max-h-10">
                <td className="px-4 py-2 font-medium text-gray-800">
                  {translationType === 'la_uk' ? dict.latin : dict.ukrainian}
                </td>
                <td className="px-4 py-2 italic text-blue-700">
                  {translationType === 'la_uk' ? dict.ukrainian : dict.latin}
                </td>
              </tr>
            ))}
            <tr className="h-full"></tr>
          </>
        )}
      </tbody>
    </table>
  )
}

export default DictionaryTable
