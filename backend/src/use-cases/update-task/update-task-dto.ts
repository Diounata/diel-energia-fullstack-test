import { TaskProps } from '../../entities/task'

export type UpdateTaskDTO = Partial<TaskProps> & { id: string }
