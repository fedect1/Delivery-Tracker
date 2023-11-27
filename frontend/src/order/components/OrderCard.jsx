import { useOrderStore } from "../../hooks/useOrderStore";

export const OrderCard = ({ orderData }) => {
    const { selectedOrderId, onCardClick, onOrderChangeStatus } = useOrderStore();




    const isSelected = orderData._id === selectedOrderId ? 'border-info' : 'border-secondary'
    return (
        <div className={`card mt-2 ${isSelected}`} onClick={() => onCardClick(orderData._id)}>
            <div className="card-header">
                Tracker Number: {orderData.trackerNumber}
            </div>
            <div className="card-body">
                <h5 className="card-title">Order Status</h5>
                <p className="card-text">Status: {orderData.status}</p>
                <h5 className="card-title">Customer Info</h5>
                <p className="card-text">Name: {orderData.costumerInfo.name}</p>
                <p className="card-text">Phone: {orderData.costumerInfo.phone}</p>
                <p className="card-text">Address: {orderData.costumerInfo.address}</p>
                <p className="card-text">Email: {orderData.costumerInfo.email}</p>

                <h5 className="card-title">Order Details</h5>
                <ul>
                    {orderData.orderDetails.items.map(item => (
                        <li key={item.itemName}>
                            {item.itemName} - Quantity: {item.quantity} - Price: ${item.pricePerItem}
                        </li>
                    ))}
                </ul>
                <p className="card-text">Total Price: ${orderData.orderDetails.totalPrice}</p>
            </div>
        <button className="btn btn-secondary mb-4" onClick={()=>onOrderChangeStatus(orderData._id)}>
            <i className="fas fa-edit"></i>
            <span> Change Status </span>
        </button>
        </div>
    );
};