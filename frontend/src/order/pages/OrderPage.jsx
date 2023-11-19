import { Navbar, OrdersList } from "../"
import ordersData from "../../orders.json"

export const OrderPage = () => {
  return (
    <>
     <Navbar />
     <OrdersList orders = {[ordersData]} />
    </>
  )
}
