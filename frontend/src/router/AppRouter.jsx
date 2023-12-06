import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth'
import { OrderPage } from '../order'
import { TrackingStatus, OrderStatus } from '../status'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])

  if (status === 'checking') {
    return <div>Loading...</div>
  }


  return (
    <Routes>
      {(status === 'non-authenticated') ? ( 
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/track-order" element={<TrackingStatus />} />
          <Route path="/track-order/:orderId" element={<OrderStatus />} />
          <Route path="/*" element={<Navigate to="auth/login"/>} />
        </>
        )
        : (
         <>
          <Route path="/" element={<OrderPage/>} />
          <Route path="/*" element={<Navigate to="/"/>} />
         </>
          
          )
        }

      
      
    </Routes>
  )
}


