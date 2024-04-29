import { add, sub } from 'date-fns'
import { describe, expect, it } from 'vitest'

import { Task } from './task'

describe('Instantiate task class', () => {
  it('should create a task', () => {
    const startsAt = new Date()
    const endsAt = add(startsAt, { hours: 1 })

    const task = new Task({
      id: '1',
      title: 'Title',
      description: 'Description',
      startsAt,
      endsAt,
    })

    expect(task).toBeInstanceOf(Task)
  })

  it('cannot create a task with end date before start date', () => {
    const startsAt = new Date()
    const endsAt = sub(startsAt, { hours: 1 })

    expect(() => {
      return new Task({
        id: '1',
        title: 'Title',
        description: 'Description',
        startsAt,
        endsAt,
      })
    }).toThrow()
  })
})
