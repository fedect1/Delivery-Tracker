import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth'
import { OrderPage } from '../order'

export const AppRouter = () => {
  const authStatus = 'authenticated'

  return (
    <Routes>
      {(authStatus === 'not-authenticated') ? <Route path="/auth/*" element={<LoginPage />} /> : <Route path="/*" element={<OrderPage/>} />}

      <Route path="/*" element={<Navigate to="auth/login"/>} />
      
      
    </Routes>
  )
}


