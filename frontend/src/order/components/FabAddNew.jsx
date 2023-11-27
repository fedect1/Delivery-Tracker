import { useOrderStore } from '../../hooks/useOrderStore';

export const FabAddNew = () => {

    const { setEmptyFieldsForModal } = useOrderStore();
    const handleClickNew = () => {
        setEmptyFieldsForModal();
    }


    return (
        <button className="btn btn-primary fab" onClick={ () => handleClickNew() }>
        <i className="fas fa-plus"></i>
        </button>
    );
};