import { AppRouter } from "./router"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
export const DeliveryTrackerApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
