import { OrderCard } from "../";

export const OrdersList = ({ orders }) => {
    console.log(orders)
    return (
        <div>
            {orders.map((order, index) => (
                <div key={index} className="mb-3">
                    <OrderCard orderData={order} />
                </div>
            ))}
        </div>
    );
};

