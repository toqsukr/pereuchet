import { useNavigate } from 'react-router-dom'
import { useLogout } from '../api/use-logout'

export const LogoutButton = () => {
  const { mutateAsync: logout } = useLogout()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(0)
  }

  return (
    <button onClick={handleLogout} className='flex justify-center items-center h-full'>
      Выйти
    </button>
  )
}
