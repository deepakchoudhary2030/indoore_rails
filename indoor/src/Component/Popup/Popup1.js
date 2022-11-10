import React from "react";
import './Popup1.css';
function Popup1(props){
  return (
    <div className="popup-box">
    
      <div className="box">
       {props.content}
       <span className="close-icon"   onClick={props.handleClose1}>x</span>
       
      </div>
    </div>
  );
};

export default Popup1;