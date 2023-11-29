import { OrderCard } from "../";
import { useUiStore } from "../../hooks/useUiStore";
import { useOrderStore } from "../../hooks/useOrderStore";
import { useEffect } from "react";


export const OrdersList = () => {
    const { openModalUi } = useUiStore();
    const { listOrders, startLoadingOrders, setEmptyFieldsForModal } = useOrderStore();
    const onNewOrder = () => {
        setEmptyFieldsForModal();
        openModalUi();
    }

    useEffect(() => {
        startLoadingOrders();
    }, [listOrders]);

    return (
        <div>
            <button className="btn btn-primary" onClick={()=>onNewOrder()}>
                <i className="fas fa-plus"></i>
                <span> New Order</span>
            </button>
            {listOrders.map((order, index) => (
                <div key={index} className="mb-3">
                    <OrderCard orderData={order} />
                </div>
            ))}
        </div>
    );
};

