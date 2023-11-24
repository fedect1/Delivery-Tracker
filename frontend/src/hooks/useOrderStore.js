import { useSelector, useDispatch } from 'react-redux' 
import { selectOrder, setActiveOrderModal } from '../store/orders/orderSlice';
import { openModal } from '../store/ui/uiSlice';

export const useOrderStore = () => {
    const dispatch = useDispatch();
    const { listOrders, selectedOrderId, isActiveOrder } = useSelector((state) => state.order);

    const onCardClick = (orderId) => {
        dispatch(selectOrder(orderId));
    }

    const onOrderChangeStatus = (orderId) => {
        dispatch(setActiveOrderModal(orderId));
        dispatch(openModal());
    }

  return {
    listOrders,
    isActiveOrder,
    selectedOrderId,
    onCardClick,
    onOrderChangeStatus,
  }
}

