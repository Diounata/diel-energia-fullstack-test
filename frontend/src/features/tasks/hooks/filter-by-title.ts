import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

import { FormInput, filterTaskByTitleSchema } from '../validators/filter-by-title'

export function useFilterTasksByTitle() {
  const { addSearchParam, removeSearchParam } = useSearchParamsManager()

  const filterTasksByTitleForm = useForm<FormInput>({
    resolver: zodResolver(filterTaskByTitleSchema),
  })

  const onChange = useCallback(() => {
    const titleFilter = filterTasksByTitleForm.getValues('title')

    if (titleFilter) addSearchParam('task-title-filter', titleFilter)
    else removeSearchParam('task-title-filter')
  }, [addSearchParam, filterTasksByTitleForm, removeSearchParam])

  return {
    filterTasksByTitleForm,
    onChange,
  }
}
