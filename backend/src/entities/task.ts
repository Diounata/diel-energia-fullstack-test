export interface TaskProps {
  id: string
  title: string
  description: string
  startsAt: Date
  endsAt: Date
}

export class Task {
  private props: TaskProps

  constructor(props: TaskProps) {
    const { startsAt, endsAt } = props

    if (endsAt <= startsAt) throw new Error('End date must not be before start date')

    this.props = props
  }
}
