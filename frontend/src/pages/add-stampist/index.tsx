import { useInvalidateStampists } from '@entities/stampist'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useAddStampist } from './api/use-add-stampist'
import css from './style.module.scss'

const StampistSchemaDTO = z.object({
  id: z.coerce.number().min(1),
  name: z
    .string()
    .min(1)
    .transform(val => val.trim()),
})

const AddStampistPage = () => {
  const { mutateAsync: addStampist, isPending: isStampistAdding } = useAddStampist()
  const invalidateStampists = useInvalidateStampists()
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: undefined,
      name: undefined,
    },
    resolver: zodResolver(StampistSchemaDTO),
  })

  const handleSaveStampist = async (data: z.infer<typeof StampistSchemaDTO>) => {
    try {
      await addStampist(data)
      invalidateStampists()
      reset()
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className={css.stampist_page}>
      <ContentField title={'Добавление штамповщика'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='id'
            control={control}
            disabled={isStampistAdding}
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
            disabled={isStampistAdding}
            render={({ field }) => <Input {...field} value={field.value ?? ''} placeholder='Имя' />}
          />
          <Button
            onClick={handleSubmit(handleSaveStampist)}
            disabled={!formState.isValid || isStampistAdding}>
            Сохранить
          </Button>
        </form>
      </ContentField>
    </div>
  )
}

export default AddStampistPage
