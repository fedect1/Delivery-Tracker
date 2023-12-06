import { useParams } from "react-router-dom"
import { useGetOrderByTrackingNum } from "../../hooks/useGetOrderByTrackingNum"
import { useEffect, useState } from "react"
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter"
import dateSetter from "../../helpers/dateSetter"
export const OrderStatus = () => {
    const { startLoadingOrderByTrackingNum } = useGetOrderByTrackingNum()
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const {orderId} = useParams()
    useEffect(() => {
        const loadOrder = async () => {
          try {
            const order = await startLoadingOrderByTrackingNum(orderId)
            setOrder(order)
            setLoading(false)
          } catch (error) {
            console.error("Error loading order", error)
            setLoading(false)
          }
        }
        loadOrder()
    }, [orderId])
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }

  return (
    <div className="card mt-5" style={{ maxWidth: '25rem', margin: 'auto' }}>
      <div className="card-header text-center">Order: <span className="text-info">{orderId}</span></div>
      <div className="card-body">
        <h5 className="card-title text-center">{order.costumerInfo.name}</h5>
        <p className="card-text text-center"><span className="text-secondary">Address:</span> {order.costumerInfo.address} </p>
        <h4 className="card-title text-center">Current status: <span className="text-warning">{capitalizeFirstLetter(order.status)}</span></h4>
        <div className="card-footer">

          <ul className="list-group list-group-flush text-right">

          { order.statusUpdates && order.statusUpdates.map((statusUpdate, index) => {
            return (
              <li key={index} className="list-group-item"><span className="text-secondary">{dateSetter(statusUpdate.timestamp)}</span> {capitalizeFirstLetter(statusUpdate.update)}</li>
              )        
            })}
          
          </ul>
        </div>
      </div>
    </div>
  )
}
