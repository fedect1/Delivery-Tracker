import deliveryTrackerApi from '../api/deliveryTracker';

export const useGetOrderByTrackingNum = () => {
    const startLoadingOrderByTrackingNum = async (trackingNum) => {
        try {
            const { data } = await deliveryTrackerApi.get(`/orders/track/${trackingNum}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    return {
      startLoadingOrderByTrackingNum
    }
}

