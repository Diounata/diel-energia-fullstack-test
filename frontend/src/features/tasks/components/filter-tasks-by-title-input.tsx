import { FormProvider } from 'react-hook-form'
import { Input } from '@/components/ui/input'

import { useFilterTasksByTitle } from '../hooks/filter-by-title'

export function FilterTasksByTitleInput() {
  const { filterTasksByTitleForm, onChange } = useFilterTasksByTitle()

  return (
    <FormProvider {...filterTasksByTitleForm}>
      <form onChange={onChange} className="w-fit">
        <Input label="" name="title" placeholder="Filtrar por título" />
      </form>
    </FormProvider>
  )
}
