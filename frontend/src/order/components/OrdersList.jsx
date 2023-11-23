import { OrderCard } from "../";
import { useUiStore } from "../../hooks/useUiStore";

export const OrdersList = ({ orders }) => {
    const { openModalUi } = useUiStore();
    
    return (
        <div>
            <button className="btn btn-primary" onClick={openModalUi}>
                <i className="fas fa-plus"></i>
                <span> New Order</span>
            </button>
            {orders.map((order, index) => (
                <div key={index} className="mb-3">
                    <OrderCard orderData={order} />
                </div>
            ))}
        </div>
    );
};

