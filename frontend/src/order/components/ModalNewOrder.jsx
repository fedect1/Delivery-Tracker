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
    const { isNewOrderModalOpen, closeModalUi } = useUiStore();
    const { isActiveOrder } = useOrderStore();
    const [formValues, setFormValues] = useState({
        fullname: '',
        address: '',
        phone: '',
        email: '',
        itemname: '',
        price: '',
        quantity: '',
        tracknumber: '',
    });

    useEffect(() => {
        if (isActiveOrder !== null) {
            setFormValues({
                fullname: isActiveOrder.costumerInfo.name,
                address: isActiveOrder.costumerInfo.address,
                phone: isActiveOrder.costumerInfo.phone,
                email: isActiveOrder.costumerInfo.email,
                itemname: isActiveOrder.orderDetails.items[0].itemName,
                price: isActiveOrder.orderDetails.totalPrice,
                quantity: isActiveOrder.orderDetails.items[0].quantity,
                tracknumber: isActiveOrder.trackerNumber,
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

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit')
        if (formValues.fullname === '' || formValues.address === '' || formValues.phone === '' || formValues.email === '' || formValues.itemname === '' || formValues.price === '' || formValues.quantity === '' || formValues.tracknumber === '') {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }
    }

  return (
    <Modal isOpen={ isNewOrderModalOpen } onRequestClose={ onCloseModal } style={ customStyles } className="modal" overlayClassName="modal-fondo" closeTimeoutMS={ 200 }>
      <h1> New Order </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
          <div className="form-group mb-2">
              <label>Costumer info</label>
              <input className="form-control" placeholder="Fullname" name='fullname' value={ formValues.fullname } onChange={ onInputChange }/>
              <input className="form-control mt-2" placeholder="Address" name='address' value={formValues.address} onChange={onInputChange}/>
              <input className="form-control mt-2" placeholder="Phone" name='phone' value={formValues.phone} onChange={onInputChange}/>
              <input className="form-control mt-2" placeholder="Email" name='email' value={formValues.email} onChange={onInputChange}/>
          </div>

          <div className="form-group mb-2">
              <label>Order Details</label>
              <input className="form-control" placeholder="Item name" name='itemname' value={formValues.itemname} onChange={onInputChange}/>
              <input className="form-control mt-2" placeholder="Price per item" name='price' value={formValues.price} onChange={onInputChange}/>
              <input className="form-control mt-2" placeholder="Quantity" name='quantity' value={formValues.quantity} onChange={onInputChange}/>
          </div>

          <hr />
          <div className="form-group mb-3">
              <label>Track number</label>
              <input className="form-control" placeholder="Track number" name='tracknumber' value={formValues.tracknumber} onChange={onInputChange}/>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Save</span>
          </button>

      </form>
    </Modal>
  )
}

export default ModalNewOrder
