import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

type AddSearchParam = (param: string, value: string) => void
type RemoveSearchParam = (param: string) => void
type ToggleSearchParam = (param: string, value: string) => void

interface Props {
  searchParams: ReadonlyURLSearchParams
  addSearchParam: AddSearchParam
  removeSearchParam: RemoveSearchParam
  toggleSearchParam: ToggleSearchParam
}

export function useSearchParamsManager(): Props {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const updateParams = () => replace(`${pathname}?${params.toString()}`)

  const addSearchParam: AddSearchParam = (param, value) => {
    params.set(param, value)
    updateParams()
  }

  const removeSearchParam: RemoveSearchParam = param => {
    params.delete(param)
    updateParams()
  }

  const toggleSearchParam: ToggleSearchParam = (param, value) => {
    if (searchParams.get(param)) return removeSearchParam(param)

    addSearchParam(param, value)
  }

  return { searchParams, addSearchParam, removeSearchParam, toggleSearchParam }
}
