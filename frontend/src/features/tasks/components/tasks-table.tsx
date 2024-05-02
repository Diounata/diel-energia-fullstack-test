import Image from 'next/image'
import { format } from 'date-fns'

import { TextButton } from '@/components/ui/text-button'

import { useTasks } from '../contexts/tasks-context'
import { useSearchParamsManager } from '@/lib/hooks/useSearchParams'

export function TasksTable() {
  const { tasks } = useTasks()
  const { addSearchParam, searchParams } = useSearchParamsManager()

  const titleFilter = searchParams.get('task-title-filter')

  const filteredTasks = titleFilter
    ? tasks.filter(task => task.title.toLowerCase().startsWith(titleFilter?.toLowerCase() || ''))
    : tasks

  return (
    <table className="bg-white rounded-xl shadow-md w-full task-table">
      <thead>
        <tr className="px-5 py-7 text-lg">
          <th className="text-center opacity-50 font-semibold">#</th>
          <th className="font-semibold">Título</th>
          <th className="font-semibold">Descrição</th>
          <th className="font-semibold">Data de início</th>
          <th className="font-semibold">Data de término</th>
          <th className="font-semibold">Ações</th>
        </tr>
      </thead>

      <tbody>
        {filteredTasks.map((task, index) => (
          <tr className="px-5 py-7" key={task.id}>
            <td className="flex items-center justify-center opacity-50">{index + 1}</td>
            <td className="flex items-center">{task.title}</td>
            <td className="flex items-center truncate">{task.description}</td>
            <td className="flex items-center">{format(new Date(task.startsAt), "dd/MM/yyyy 'às' HH:mm")}</td>
            <td className="flex items-center">{format(new Date(task.endsAt), "dd/MM/yyyy 'às' HH:mm")}</td>
            <td className="flex items-center gap-4">
              <TextButton
                onClick={() => {
                  addSearchParam('modal', 'update-task')
                  addSearchParam('id', task.id)
                }}
              >
                <Image src="/edit.svg" alt="Edit" width={18} height={16} /> Editar
              </TextButton>

              <TextButton
                onClick={() => {
                  addSearchParam('modal', 'delete-task')
                  addSearchParam('id', task.id)
                }}
              >
                <Image src="/trash.svg" alt="Delete" width={14} height={16} /> Deletar
              </TextButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
