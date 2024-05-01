import { GetTasksByMonthUseCase } from './get-tasks-by-month-use-case'
import { GetTasksByMonthController } from './get-tasks-by-month-controller'
import { TasksRepository } from '../../repositories/tasks-repository'

const prismaTasksRepository = new TasksRepository()
const getTasksByMonthUseCase = new GetTasksByMonthUseCase(prismaTasksRepository)
const getTasksByMonthController = new GetTasksByMonthController(getTasksByMonthUseCase)

export { getTasksByMonthController }
