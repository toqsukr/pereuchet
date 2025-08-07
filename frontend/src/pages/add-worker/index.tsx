import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useAddWorker } from './api/use-add-worker'
import css from './style.module.scss'

const WorkerSchemaDTO = z.object({
  id: z.coerce.number().min(1),
  name: z
    .string()
    .min(1)
    .transform(val => val.trim()),
})

const AddWorkerPage = () => {
  const { mutateAsync: addWorker } = useAddWorker()
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: undefined,
      name: undefined,
    },
    resolver: zodResolver(WorkerSchemaDTO),
  })

  const handleSaveProduct = async (data: z.infer<typeof WorkerSchemaDTO>) => {
    try {
      await addWorker(data)
      reset()
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className={css.worker_page}>
      <ContentField title={'Добавление штамповщика'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='id'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder='Уникальный номер'
                type='tel'
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            render={({ field }) => <Input {...field} value={field.value ?? ''} placeholder='Имя' />}
          />
          <Button onClick={handleSubmit(handleSaveProduct)} disabled={!formState.isValid}>
            Сохранить
          </Button>
        </form>
      </ContentField>
    </div>
  )
}

export default AddWorkerPage
