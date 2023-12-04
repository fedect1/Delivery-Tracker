import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useOrderStore } from '../../hooks/useOrderStore';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const ModalNewOrder = () => {
    const [ statusHidden, setStatusHidden ] = useState("received");
    const { isNewOrderModalOpen, closeModalUi } = useUiStore();
    const { isActiveOrder, startSavingOrder, startUpdatingOrderStatus } = useOrderStore();
    const [formValues, setFormValues] = useState({
        fullname: '',
        address: '',
        phone: '',
        email: '',
        status: '',
        tracknumber: '',
    });

    useEffect(() => {
        if (isActiveOrder !== null) {
            setFormValues({
                ...formValues,
                status: isActiveOrder.status,
                tracknumber: isActiveOrder.trackerNumber,
            })
            setStatusHidden(isActiveOrder.status);
        } else {
            setFormValues({
                fullname: '',
                address: '',
                phone: '',
                email: '',
                status: '',
                tracknumber: '',
            });
        }
    }, [isActiveOrder]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onCloseModal = () => {
        closeModalUi();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newOrderData = {
            costumerInfo: {
                name: formValues.fullname,
                phone: formValues.phone,
                address: formValues.address,
                email: formValues.email,
            },
            status: formValues.status,
        };
        if (isActiveOrder === null) {
            if (formValues.fullname === '' || formValues.address === '' || formValues.phone === '' || formValues.email === '' ) {
                Swal.fire('Error', 'All fields are required', 'error');
                return;
            }
            await startSavingOrder(newOrderData);
            closeModalUi();
        } else {
            await startUpdatingOrderStatus({ id: isActiveOrder._id, status: formValues.status });
            closeModalUi();
        }
    }

    const statusOptions = [
        { value: "received", label: "Received" },
        { value: "preparing", label: "Preparing" },
        { value: "out for delivery", label: "Out for Delivery" },
        { value: "delivered", label: "Delivered" }
    ];



  return (
    <Modal isOpen={ isNewOrderModalOpen } onRequestClose={ onCloseModal } style={ customStyles } className="modal" overlayClassName="modal-fondo" closeTimeoutMS={ 200 }>
      <form className="modal-content" onSubmit={ onSubmit }>
        <div className="modal-header">
            <h5 className="modal-title">{isActiveOrder ? 'Change Status' : 'Create New Order'}</h5>
        </div>
        { isActiveOrder ? (
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="trackNumber">Track Number</label>
                    <input id="trackNumber" type="text" className="form-control" value={formValues.tracknumber} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="currentStatus">Current Status</label>
                    <input id="currentStatus" type="text" className="form-control" value={statusHidden} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="newStatus">New Status</label>
                    <select id="newStatus" className="form-control" name='status' value={formValues.status} onChange={onInputChange}>
                        {statusOptions.filter((option) => option.value !== statusHidden).map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        ) : (
            <div className="modal-body">

                <div className="form-group mb-2">
                    <label>Costumer info</label>
                    <input className="form-control" placeholder="Fullname" name='fullname' value={ formValues.fullname } onChange={ onInputChange }/>
                    <input className="form-control mt-2" placeholder="Address" name='address' value={formValues.address} onChange={onInputChange}/>
                    <input className="form-control mt-2" placeholder="Phone" name='phone' value={formValues.phone} onChange={onInputChange}/>
                    <input className="form-control mt-2" placeholder="Email" name='email' value={formValues.email} onChange={onInputChange}/>
                </div>

            </div>
             )}
        <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>
        </div>

      </form>
    </Modal>
  )
}

export default ModalNewOrder
