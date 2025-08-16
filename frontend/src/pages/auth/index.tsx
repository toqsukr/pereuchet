import { useIsAuth } from '@entities/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '@shared/api/query-client'
import { Routes } from '@shared/model/routes'
import Button from '@shared/uikit/button/button'
import ContentField from '@shared/uikit/content-field/content-field'
import Input from '@shared/uikit/input'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from './api/use-login'
import css from './style.module.scss'

const AuthPage = () => {
  const navigate = useNavigate()
  const { mutateAsync: signIn } = useLogin()
  const { data: isAuthorized } = useIsAuth()
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(
      z.object({
        login: z
          .string()
          .min(1)
          .transform(val => val.trim()),
        password: z
          .string()
          .min(1)
          .transform(val => val.trim()),
      })
    ),
  })

  const onSubmit = async (formData: { login: string; password: string }) => {
    await signIn(formData)
    queryClient.clear()
    navigate(Routes.ADD_STAMPED_PRODUCT)
  }

  if (isAuthorized) return <Navigate to={Routes.ADD_STAMPED_PRODUCT} />

  return (
    <section className={css.auth_page}>
      <ContentField title='Вход в аккаунт'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
