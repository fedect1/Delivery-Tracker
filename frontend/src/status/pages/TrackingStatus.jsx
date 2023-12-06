import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const TrackingStatus = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/track-order/${trackingNumber}`)
  };

  const goBack = () => {
    navigate(`/`)
  }

  return (
    <div className="container">
        <div className="text-end mt-3">
          <button className="btn btn-outline-primary" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
            &nbsp;
            Back  
          </button>
        </div>
        <div className="card mt-5 text-center" style={{ maxWidth: '20rem', margin: 'auto' }}>
            <h5 className="card-header">Tracking Status</h5>
            <form className="form-inline container mt-2" onSubmit={handleSubmit}>
                <div className="form-group mx-sm-3 mb-2">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="inputTrackingNumber" 
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={handleTrackingNumberChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Check status</button>
            </form>
        </div>

    </div>
  );
};
