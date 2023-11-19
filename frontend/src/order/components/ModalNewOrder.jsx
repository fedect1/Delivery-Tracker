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
        <h1>New order</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi vero odit labore minima nobis praesentium ex illum officiis. Excepturi dignissimos asperiores repellat rem consequuntur in sapiente corrupti, aut accusantium minima!</p>
    </Modal>
  )
}

export default ModalNewOrder
