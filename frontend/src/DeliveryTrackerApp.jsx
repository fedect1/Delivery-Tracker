import { AppRouter } from "./router"
import { BrowserRouter } from "react-router-dom"

export const DeliveryTrackerApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
