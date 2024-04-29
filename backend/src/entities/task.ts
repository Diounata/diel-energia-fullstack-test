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

  setProps(props: Partial<TaskProps>) {
    this.props = Object.assign(this.props, props)
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get startsAt() {
    return this.props.startsAt
  }

  get endsAt() {
    return this.props.endsAt
  }
}
