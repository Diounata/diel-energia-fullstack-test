import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TextButton } from '@/components/ui/text-button'

interface Props {
  type: 'create' | 'update'
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<any>
  setIsOpen: Function
}

export function TaskForm({ type, form, onSubmit, setIsOpen }: Props) {
  const type_message = type === 'create' ? 'Criar' : 'Atualizar'

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col">
          <h1 className="text-2xl font-medium">{type_message} tarefa</h1>

          <p className="text-lg font-normal opacity-40">
            Preencha o formulário abaixo para {type_message.toLowerCase()} {type === 'create' ? 'uma nova' : 'esta'}{' '}
            tarefa.
          </p>
        </header>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-11">
          <div className="flex flex-col gap-4 w-full">
            <Input label="Título" name="title" />
            <Input label="Descrição" name="description" />

            <section className="flex justify-between">
              <Input label="Data de início" name="startsAt" type="datetime-local" />
              <Input label="Data de término" name="endsAt" type="datetime-local" />
            </section>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="h-9">
              {type_message}
            </Button>

            <TextButton type="button" onClick={() => setIsOpen()}>
              Cancelar
            </TextButton>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
