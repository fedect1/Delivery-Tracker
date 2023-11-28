import { useSelector, useDispatch } from 'react-redux' 
import { addNewOrder, onLoadOrders, selectOrder, setActiveOrderModal, setActiveOrderModalToNull, updateStatus } from '../store/orders/orderSlice';
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
      //TODO: Add backend call to save order
      if (newOrder._id) {
        console.log("Updating order");
      } else {
        const { data } = await deliveryTrackerApi.post('/orders', newOrder);
        console.log({data});
        dispatch(addNewOrder(data));
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
    
    const startUpdatingOrderStatus = async ({ _id, status }) => {
      dispatch(updateStatus({  _id, status }));
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
    startLoadingOrders
  }
}

