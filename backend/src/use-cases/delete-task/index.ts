import { TasksRepository } from '../../repositories/tasks-repository'
import { DeleteTaskUseCase } from './delete-task-use-case'
import { DeleteTaskController } from './delete-task-controller'

const prismaTasksRepository = new TasksRepository()
const deleteTaskUseCase = new DeleteTaskUseCase(prismaTasksRepository)
const deleteTaskController = new DeleteTaskController(deleteTaskUseCase)

export { deleteTaskController }
