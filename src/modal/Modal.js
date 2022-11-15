import React from 'react';
import "../css/modal.css"
import {Button} from "@mui/material";
const Modal = ({active,setActive,content}) => {
    return (
        <div className={active ? "modalStyle":"modalOff"}>
            <div className="modalStyle__content">
                <Button onClick={()=>setActive(false)} className="modalButton">Close</Button>
                {content}
            </div>
        </div>
    );
};

export default Modal;