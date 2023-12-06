import { useParams } from "react-router-dom"
import { useGetOrderByTrackingNum } from "../../hooks/useGetOrderByTrackingNum"
import { useEffect, useState } from "react"
export const OrderStatus = () => {
    const { startLoadingOrderByTrackingNum } = useGetOrderByTrackingNum()
    const [order, setOrder] = useState({})
    const {orderId} = useParams()
    useEffect(() => {
        const loadOrder = async () => {
          try {
            const order = await startLoadingOrderByTrackingNum(orderId)
            setOrder(order)
          } catch (error) {
            console.error("Error loading order", error)
          }
        }
        loadOrder()
    }, [orderId])
    console.log(order)
  return (
    <div className="card mt-5" style={{ maxWidth: '25rem', margin: 'auto' }}>
      <div className="card-header text-center">The status for order <span className="text-info">{orderId}</span></div>
      <div class="card-body">
        <h5 class="card-title text-center">Juan Carlos Abdo</h5>
        <p class="card-text text-center"><span className="text-secondary">Address:</span> Rosario Central 1284, Berlin, 12456 </p>

        <ul class="list-group list-group-flush text-right">
            <li class="list-group-item"><span className="text-secondary">10/5/2023</span> Delivered</li>
            <li class="list-group-item"><span className="text-secondary">10/5/2023</span> Out for delivery</li>
            <li class="list-group-item"><span className="text-secondary">10/5/2023</span> Recived</li>
            <li class="list-group-item"><span className="text-secondary">10/5/2023</span> Delivered</li>
        </ul>
        </div>
    </div>
  )
}
