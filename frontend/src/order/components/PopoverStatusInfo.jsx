import { Children } from "react";
import { useState } from "react"
import dateSetter from "../../helpers/dateSetter";


export const PopoverStatusInfo = ({ children, content }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const getStatusStyle = (status) => {
      switch (status) {
          case 'Received':
              return { color: 'blue' };
          case 'Preparing':
              return { color: 'orange' };
          case 'Out for delivery':
              return { color: 'purple' };
          case 'Delivered':
              return { color: 'green' };
          default:
              return {};
      }
  };

  return (
    <div>
      <button onClick={() => setPopoverOpen(!popoverOpen)} className="btn btn-muted text-center" style={getStatusStyle(children)}> {children} </button> {popoverOpen && ( 
                <div style={{ position: 'absolute', border: '1px solid black', padding: '10px', backgroundColor: 'white' }}>
                {content.map((item, index) => (
                  <div className="card border mb-1 text-dark" key={index}>
                    <strong>Update:</strong> {item.update} <br/>
                    <strong>Timestamp:</strong> {dateSetter(item.timestamp)} <br/>
                  </div>
                ))}
              </div>
        )}
    </div>
  )
}

export default PopoverStatusInfo
