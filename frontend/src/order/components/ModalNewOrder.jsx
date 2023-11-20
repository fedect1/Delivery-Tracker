import Modal from 'react-modal'
import { useState } from 'react'

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
    const [modalIsOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        console.log('onCloseModal')
        setIsOpen(false);
    }

  return (
    <Modal isOpen={ modalIsOpen } onRequestClose={ onCloseModal } style={ customStyles } className="modal" overlayClassName="modal-fondo" closeTimeoutMS={ 200 }>
      <h1> New Order </h1>
      <hr />
      <form className="container">
          <div className="form-group mb-2">
              <label>Costumer info</label>
              <input className="form-control" placeholder="Fullname" />
              <input className="form-control mt-2" placeholder="Address" />
              <input className="form-control mt-2" placeholder="Phone" />
              <input className="form-control mt-2" placeholder="Email" />
          </div>

          <div className="form-group mb-2">
              <label>Order Details</label>
              <input className="form-control" placeholder="Item name" />
              <input className="form-control mt-2" placeholder="Price per item" />
              <input className="form-control mt-2" placeholder="Quantity" />
          </div>

          <hr />
          <div className="form-group mb-3">
              <label>Track number</label>
              <input className="form-control" placeholder="Track number" />
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
