import { Children } from "react";
import { useState } from "react"


export const PopoverStatusInfo = ({ children, content }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    console.log(content)

  return (
    <div>
      <button onClick={() => setPopoverOpen(!popoverOpen)}> {children} </button> {popoverOpen && ( 
                <div style={{ position: 'absolute', border: '1px solid black', padding: '10px', backgroundColor: 'white' }}>
                {content.map((item, index) => (
                  <div key={index}>
                    <strong>Update:</strong> {item.update} <br/>
                    <strong>Timestamp:</strong> {item.timestamp}
                  </div>
                ))}
              </div>
        )}
    </div>
  )
}

export default PopoverStatusInfo
