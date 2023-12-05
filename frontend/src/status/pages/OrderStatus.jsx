import { useParams } from "react-router-dom"

export const OrderStatus = () => {
    const {orderId} = useParams()
  return (
    <div>
      <p>Order status for order {orderId}</p>
    </div>
  )
}
