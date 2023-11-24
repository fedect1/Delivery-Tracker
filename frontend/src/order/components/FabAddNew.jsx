import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNew = () => {
    const { openModalUi } = useUiStore();
    return (
        <button className="btn btn-primary fab" onClick={ openModalUi }>
        <i className="fas fa-plus"></i>
        </button>
    );
};