import { zodResolver } from '@hookform/resolvers/zod'
import { Routes } from '@shared/model/routes'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from './api/use-login'

const AuthPage = () => {
  const navigate = useNavigate()
  const { mutateAsync: signIn } = useLogin()
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(z.object({ login: z.string(), password: z.string() })),
  })

  const onSubmit = (formData: { login: string; password: string }) => {
    signIn(formData).then(() => navigate(Routes.CONTROL_BOARD))
  }

  return (
    <section className='h-full w-full max-w-[576px] min-w-[285px] fixed top-1/2 left-1/2 -translate-1/2 p-8 flex justify-center items-center'>
      <ContentField>
        <form onSubmit={e => e.preventDefault()} className='h-full flex flex-col gap-4'>
          <Controller
            control={control}
            name='login'
            render={({ field }) => <Input {...field} placeholder='Enter login' />}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <Input {...field} placeholder='Enter password' type='password' />
            )}
          />
          <Button onClick={handleSubmit(onSubmit)}>Войти</Button>
        </form>
      </ContentField>
    </section>
  )
}

export default AuthPage
