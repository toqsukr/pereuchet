import { useIsAuth } from '@entities/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '@shared/api/query-client'
import { Routes } from '@shared/model/routes'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from './api/use-login'

const AuthPage = () => {
  const navigate = useNavigate()
  const { mutateAsync: signIn } = useLogin()
  const { data: isAuthorized } = useIsAuth()
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(z.object({ login: z.string(), password: z.string() })),
  })

  const onSubmit = async (formData: { login: string; password: string }) => {
    await signIn(formData)
    queryClient.clear()
    navigate(Routes.HOME)
  }

  if (isAuthorized) return <Navigate to={Routes.HOME} />

  return (
    <section className='h-max w-full max-w-[576px] min-w-[285px] fixed top-1/2 left-1/2 -translate-1/2 p-8 flex justify-center items-center'>
      <ContentField title='Вход в аккаунт'>
        <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col gap-4'>
          <Controller
            control={control}
            name='login'
            render={({ field }) => <Input {...field} placeholder='Введите логин' />}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <Input {...field} placeholder='Введите пароль' type='password' />
            )}
          />
          <Button onClick={handleSubmit(onSubmit)}>Войти</Button>
        </form>
      </ContentField>
    </section>
  )
}

export default AuthPage
