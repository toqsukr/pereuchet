import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ruRU } from '@mui/x-date-pickers/locales'
import { queryClient } from '@shared/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Confirmations } from '@widgets/confirmations'
import 'dayjs/locale/ru'
import { StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'

const russianLocaleText = {
  ...ruRU.components.MuiLocalizationProvider.defaultProps.localeText,
  datePickerToolbarTitle: 'Выберите дату',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider
          localeText={russianLocaleText}
          adapterLocale='ru'
          dateAdapter={AdapterDayjs}>
          <Confirmations>
            <RouterProvider router={router} />
          </Confirmations>
        </LocalizationProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>
)
