import { useSelector } from 'react-redux' 


export const useOrderStore = () => {
    const { listOrders } = useSelector((state) => state.order);
  return {
    listOrders,
  }
}

