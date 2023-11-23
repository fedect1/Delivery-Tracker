import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../store/ui/uiSlice';

export const useUiStore = () => {
    const dispatch = useDispatch();
    const { isNewOrderModalOpen } = useSelector((state) => state.ui);

    const openModalUi = () => {
        dispatch( openModal() );
    }

    const closeModalUi = () => {
        dispatch( closeModal() );
    }
    
    return { isNewOrderModalOpen, openModalUi, closeModalUi };
}