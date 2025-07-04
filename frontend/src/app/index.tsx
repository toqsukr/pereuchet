import HomePage from '@pages/home'
import { queryClient } from '@shared/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  </StrictMode>
)
