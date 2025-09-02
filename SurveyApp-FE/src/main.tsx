import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { AuthContextProvider } from './context/AuthContext.js'
import { AuroraBackground } from './components/ui/aurora-background.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuroraBackground className='z-0'>
    {/* <h4>Surveys</h4> */}
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
    </AuroraBackground>
  </StrictMode>,
)
