import { useProducts } from '@entities/product'
import { useWorkers } from '@entities/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field'
import Input from '@shared/uikit/input'
import Select from '@shared/uikit/select/select'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const recordSchema = z.object({
  workerID: z.string().min(1),
  productID: z.string().min(1),
  amount: z.coerce.number().positive().max(5000),
})

const HomePage = () => {
  const { data: workers } = useWorkers()
  const { data: products } = useProducts()
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: zodResolver(recordSchema),
  })

  const handleSaveProduct = (data: z.infer<typeof recordSchema>) => {
    console.log(data)
  }

  return (
    <div className='h-full max-w-[576px] min-w-[285px] p-8 mx-auto'>
      <ContentField title={'Добавление продукта'}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
          <Controller
            name='workerID'
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value=''>Выберите ваш ID</Select.Option>
                {workers?.map(({ id }) => (
                  <Select.Option key={id} value={id}>
                    {id}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name='productID'
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value=''>Выберите продукт</Select.Option>
                {products?.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name='amount'
            control={control}
            render={({ field }) => <Input {...field} placeholder='Количество коробок' type='tel' />}
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
