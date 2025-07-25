import { useProducts } from '@entities/product'
import { useWorkers } from '@entities/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field'
import Input from '@shared/uikit/input'
import Select from '@shared/uikit/select/select'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSaveRecord } from './model/use-save-record'

const FormSchemaDTO = z.object({
  workerID: z.coerce.number().min(1),
  productCode: z.string().min(1),
  amount: z.coerce.number().positive().int().max(5000),
})

const HomePage = () => {
  const { data: workers } = useWorkers()
  const { data: products } = useProducts()
  const { mutateAsync: saveRecord } = useSaveRecord()
  const { control, formState, resetField, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: undefined,
      productCode: undefined,
      workerID: undefined,
    },
    resolver: zodResolver(FormSchemaDTO),
  })

  const handleSaveProduct = async (data: z.infer<typeof FormSchemaDTO>) => {
    try {
      await saveRecord(data)
      resetField('amount')
      resetField('productCode')
    } catch (e) {
      alert('Saving error!')
    }
  }

  return (
    <div className='w-full max-w-[576px] min-w-[285px] absolute top-1/3 left-1/2 -translate-1/2 p-8'>
      <ContentField title={'Добавление продукта'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='workerID'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value ?? ''}>
                <Select.Option value={''}>Выберите ваш ID</Select.Option>
                {workers?.map(({ id }) => (
                  <Select.Option key={id} value={id}>
                    {id}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name='productCode'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value ?? ''}>
                <Select.Option value={''}>Выберите продукт</Select.Option>
                {products?.map(({ name, code }) => (
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
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder='Количество коробок'
                type='tel'
              />
            )}
          />
          <Button onClick={handleSubmit(handleSaveProduct)} disabled={!formState.isValid}>
            Сохранить
          </Button>
        </form>
      </ContentField>
    </div>
  )
}

export default HomePage
