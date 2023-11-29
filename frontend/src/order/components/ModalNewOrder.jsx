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
    const { isActiveOrder, startSavingOrder, startUpdatingOrderStatus } = useOrderStore();
    const [formValues, setFormValues] = useState({
        fullname: '',
        address: '',
        phone: '',
        email: '',
        itemname: '',
        pricePerItem: '',
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
                pricePerItem: isActiveOrder.orderDetails.items[0].pricePerItem,
                quantity: isActiveOrder.orderDetails.items[0].quantity,
                tracknumber: isActiveOrder.trackerNumber,
                status: isActiveOrder.status,
            });
        } else {
            setFormValues({
                fullname: '',
                address: '',
                phone: '',
                email: '',
                itemname: '',
                pricePerItem: '',
                quantity: '',
                tracknumber: '',
                status: '',
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
        console.log(formValues)
        if (formValues.fullname === '' || formValues.address === '' || formValues.phone === '' || formValues.email === '' || formValues.itemname === '' || formValues.price === '' || formValues.quantity === '' || formValues.tracknumber === '') {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }
        const newOrderData = {
            trackerNumber: formValues.tracknumber,
            costumerInfo: {
                name: formValues.fullname,
                phone: formValues.phone,
                address: formValues.address,
                email: formValues.email,
            },
            orderDetails: {
                items: [
                    {
                        itemName: formValues.itemname,
                        quantity: parseInt(formValues.quantity), 
                        pricePerItem: parseFloat(formValues.pricePerItem) 
                    },

                ],
                totalPrice: parseFloat(formValues.price) * parseInt(formValues.quantity), 
            },
            status: formValues.status,
        };
        if (isActiveOrder === null) {
            await startSavingOrder(newOrderData);
            closeModalUi();
        } else {
            await startUpdatingOrderStatus({ id: isActiveOrder._id, status: formValues.status });
            closeModalUi();
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
              <input className="form-control mt-2" placeholder="Price per item" name='pricePerItem' value={formValues.pricePerItem} onChange={onInputChange}/>
              <input className="form-control mt-2" placeholder="Quantity" name='quantity' value={formValues.quantity} onChange={onInputChange}/>
          </div>

          <hr />
          <div className="form-group mb-3">
              <label>Track number</label>
              <input className="form-control" placeholder="Track number" name='tracknumber' value={formValues.tracknumber} onChange={onInputChange}/>
          </div>
          <div className="form-group mb-3">
                <label>Status</label>
                <select className="form-control" name='status' value={formValues.status} onChange={onInputChange}>
                    <option value="received">received</option>
                    <option value="preparing">preparing</option>
                    <option value="out for delivery">out for delivery</option>
                    <option value="delivered">delivered</option>
                </select>
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
