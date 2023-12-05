import React, { useState } from 'react';

export const TrackingStatus = () => {


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes añadir la lógica para manejar el envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div className="container">
        <div className="card mt-5 text-center" style={{ maxWidth: '20rem', margin: 'auto' }}>
            <h5 className="card-header">Tracking Status</h5>
            <form className="form-inline container mt-2" onSubmit={handleSubmit}>
                <div className="form-group mx-sm-3 mb-2">
                    <input 
                    type="password" 
                    className="form-control" 
                    id="inputPassword2" 
                    placeholder="Enter tracking number"
                    //value={password}
                    //onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Check status</button>
            </form>
        </div>

    </div>
  );
};
