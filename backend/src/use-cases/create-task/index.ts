import { TasksRepository } from '../../repositories/tasks-repository'
import { CreateTaskUseCase } from './create-task-use-case'
import { CreateTaskController } from './create-task-controller'

const prismaTasksRepository = new TasksRepository()
const createTaskUseCase = new CreateTaskUseCase(prismaTasksRepository)
const createTaskController = new CreateTaskController(createTaskUseCase)

export { createTaskController }
