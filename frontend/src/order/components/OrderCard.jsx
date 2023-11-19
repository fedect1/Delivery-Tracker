export const OrderCard = ({ orderData }) => {
    return (
        <div className="card">
            <div className="card-header">
                Tracker Number: {orderData.trackerNumber}
            </div>
            <div className="card-body">
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
        </div>
    );
};