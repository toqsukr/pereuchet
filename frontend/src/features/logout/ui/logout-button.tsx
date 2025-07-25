import { IconButton } from '@shared/uikit/icon-button'
import { IoExitOutline } from 'react-icons/io5'
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
    <IconButton
      onClick={handleLogout}
      Icon={<IoExitOutline className='w-6 h-6 scale-125 translate-x-0.5' />}
    />
  )
}
