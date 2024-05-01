import { UpdateTaskUseCase } from './update-task-use-case'
import { UpdateTaskController } from './update-task-controller'
import { TasksRepository } from '../../repositories/tasks-repository'

const prismaTasksRepository = new TasksRepository()
const updateTaskUseCase = new UpdateTaskUseCase(prismaTasksRepository)
const updateTaskController = new UpdateTaskController(updateTaskUseCase)

export { updateTaskController }
