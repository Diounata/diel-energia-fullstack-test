import { Task, TaskProps } from '../entities/task'

export interface TasksRepository {
  create(task: Task): Promise<Task>
  update(task: Partial<TaskProps> & { id: string }): Promise<Task>
  delete(id: string): Promise<string>
}
