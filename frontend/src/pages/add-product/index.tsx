import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAddProduct } from './ui/use-add-product'

const ProductSchemaDTO = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
})

const AddProductPage = () => {
  const { mutateAsync: addProduct } = useAddProduct()
  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: undefined,
      name: undefined,
    },
    resolver: zodResolver(ProductSchemaDTO),
  })

  const handleSaveProduct = async (data: z.infer<typeof ProductSchemaDTO>) => {
    try {
      await addProduct(data)
      reset()
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className='w-full max-w-[576px] min-w-[285px] fixed top-1/3 left-1/2 -translate-1/2 p-8'>
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

export default AddProductPage
