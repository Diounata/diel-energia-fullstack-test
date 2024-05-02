import { GetTasksUseCase } from './get-tasks-use-case'
import { GetTasksController } from './get-tasks-controller'
import { TasksRepository } from '../../repositories/tasks-repository'

const prismaTasksRepository = new TasksRepository()
const getTasksUseCase = new GetTasksUseCase(prismaTasksRepository)
const getTasksController = new GetTasksController(getTasksUseCase)

export { getTasksController }
