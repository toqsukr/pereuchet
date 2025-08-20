import { useInvalidateStampedProducts } from '@entities/stamped-product'
import { useStampists } from '@entities/stampist'
import { useTreads } from '@entities/tread'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field/content-field'
import Input from '@shared/uikit/input'
import Select from '@shared/uikit/select/select'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAcceptProduct } from './api/use-accept-product'
import css from './style.module.scss'

const FormSchemaDTO = z.object({
  stampistID: z.coerce.number().min(1),
  treadCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
})

const HomePage = () => {
  const { data: stampists } = useStampists()
  const { data: treads } = useTreads()
  const { mutateAsync: acceptProduct, isPending: isProductAccepting } = useAcceptProduct()
  const invalidateProducts = useInvalidateStampedProducts()
  const { control, formState, resetField, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: undefined,
      treadCode: undefined,
      stampistID: undefined,
    },
    resolver: zodResolver(FormSchemaDTO),
  })

  const handleSaveProduct = async (data: z.infer<typeof FormSchemaDTO>) => {
    try {
      await acceptProduct(data)
      invalidateProducts()
      resetField('amount')
      resetField('treadCode')
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className={css.product_page}>
      <ContentField title={'Добавление продукта'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='stampistID'
            control={control}
            disabled={isProductAccepting}
            render={({ field }) => (
              <Select {...field} value={field.value ?? ''}>
                <Select.Option value={''}>Выберите ваш ID</Select.Option>
                {stampists?.map(({ id }) => (
                  <Select.Option key={id} value={id}>
                    {id}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name='treadCode'
            control={control}
            disabled={isProductAccepting}
            render={({ field }) => (
              <Select {...field} value={field.value ?? ''}>
                <Select.Option value={''}>Выберите продукт</Select.Option>
                {treads?.map(({ name, code }) => (
                  <Select.Option key={code} value={code}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name='amount'
            control={control}
            disabled={isProductAccepting}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder='Количество коробок'
                type='tel'
              />
            )}
          />
          <Button
            onClick={handleSubmit(handleSaveProduct)}
            disabled={!formState.isValid || isProductAccepting}>
            Сохранить
          </Button>
        </form>
      </ContentField>
    </div>
  )
}

export default HomePage
