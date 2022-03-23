import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { processData } from '../util/constants'
import { allDataState, currentYearState } from '../state/editorState'
import { CountryData } from './useData'

const useEditorMap = () => {
  const allData = useRecoilValue(allDataState)
  const currentYear = useRecoilValue(currentYearState)
  const [data, setData] = useState<CountryData | undefined>(undefined)

  useEffect(() => {
    if (allData && currentYear) {
      setData(processData(allData.find(x => x.year == currentYear)!.data))
    }
  }, [allData, currentYear])

  return [data] as const
}

export default useEditorMap
