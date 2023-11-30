import Modal from 'react-modal';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

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

export const ModalChangeStatus = () => {
    return (
<Modal
    isOpen={false}
    style={customStyles}
    //onRequestClose={ onCloseModal }
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={ 200 }
    >
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Change Status</h5>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="trackNumber">Track Number</label>
                    <input id="trackNumber" type="text" className="form-control" value="123456" readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="currentStatus">Current Status</label>
                    <input id="currentStatus" type="text" className="form-control" value="Pending" readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="newStatus">New Status</label>
                    <select id="newStatus" className="form-control" name='status'>
                        <option value="received">Received</option>
                        <option value="preparing">Preparing</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                    <i className="far fa-save"></i> Save
                </button>
            </div>
        </div>
    </Modal>

    )
}