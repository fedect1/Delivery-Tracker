import { useSelector, useDispatch } from 'react-redux' 
import { addNewOrder, onLoadOrders, selectOrder, setActiveOrderModal, setActiveOrderModalToNull, updateStatus, deleteOrder } from '../store/orders/orderSlice';
import { openModal } from '../store/ui/uiSlice';
import deliveryTrackerApi from '../api/deliveryTracker';

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
      try {
        const { data } = await deliveryTrackerApi.post('/orders', newOrder);
        dispatch(addNewOrder(data));
      } catch (error) {
        console.log(error);
      }
    }

    const startLoadingOrders = async () => {
      try{
        const { data } = await deliveryTrackerApi.get('/orders');
        dispatch(onLoadOrders(data));
      } catch (error) {
        console.log(error);
      }
    }
    
    const startUpdatingOrderStatus = async ({ id, status }) => {
      try {
        const { data } = await deliveryTrackerApi.patch(`/orders/${id}/status`, {status});
        dispatch(updateStatus(data));
      } catch (error) {
        console.log(error);
      }
    }

    const startDeletingOrder = async (orderId) => {
      try {
        await deliveryTrackerApi.delete(`/orders/${orderId}`);
        console.log("deleteOrder")

        dispatch(deleteOrder(orderId));
      } catch (error) {
        console.log(error);
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
    startUpdatingOrderStatus,
    startLoadingOrders,
    startDeletingOrder,
  }
}

