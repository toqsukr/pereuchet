import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import css from './style.module.scss'
import { useAddTread } from './ui/use-add-tread'

const TreadSchemaDTO = z.object({
  code: z
    .string()
    .min(1)
    .transform(val => val.trim()),
  name: z
    .string()
    .min(1)
    .transform(val => val.trim()),
})

const AddTreadPage = () => {
  const { mutateAsync: addTread } = useAddTread()
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: undefined,
      name: undefined,
    },
    resolver: zodResolver(TreadSchemaDTO),
  })

  const handleSaveTread = async (data: z.infer<typeof TreadSchemaDTO>) => {
    try {
      await addTread(data)
      reset()
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className={css.tread_page}>
      <ContentField title={'Добавление подошвы'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ''} placeholder='Уникальный код' />
            )}
          />
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ''} placeholder='Название' />
            )}
          />
          <Button onClick={handleSubmit(handleSaveTread)} disabled={!formState.isValid}>
            Сохранить
          </Button>
        </form>
      </ContentField>
    </div>
  )
}

export default AddTreadPage
