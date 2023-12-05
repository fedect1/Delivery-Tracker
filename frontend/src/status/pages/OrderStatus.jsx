import { useParams } from "react-router-dom"

export const OrderStatus = () => {
    const {orderId} = useParams()
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
