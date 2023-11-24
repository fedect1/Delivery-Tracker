import { useSelector, useDispatch } from 'react-redux' 
import { selectOrder } from '../store/orders/orderSlice';

export const useOrderStore = () => {
    const dispatch = useDispatch();
    const { listOrders, selectedOrderId } = useSelector((state) => state.order);

    const onCardClick = (orderId) => {
        dispatch(selectOrder(orderId));
    }
  return {
    listOrders,
    selectedOrderId,
    onCardClick
  }
}

