import { useSelector, useDispatch } from 'react-redux' 
import { addNewOrder, selectOrder, setActiveOrderModal, setActiveOrderModalToNull } from '../store/orders/orderSlice';
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

    const setEmptyFieldsForModal = () => {
        dispatch(setActiveOrderModalToNull());
        dispatch(openModal());
    }

    const startSavingOrder = async ( newOrder ) => {
      //TODO: Add backend call to save order
      if (newOrder._id) {
        console.log("Updating order");
      } else {
        dispatch(addNewOrder({ ...newOrder, _id: "12345" }));
      }
    }


  return {
    listOrders,
    isActiveOrder,
    selectedOrderId,
    setActiveOrderModal,
    onCardClick,
    onOrderChangeStatus,
    setEmptyFieldsForModal,
    startSavingOrder,
  }
}

