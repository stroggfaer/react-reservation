import React from 'react'
import Form from "../Form/Form";

const Popup = props => {

    if (props.isModalOpen === false)   return null

    return (
        <div className="modal__com">
            <div className="bg" onClick={event =>props.onModal(event,'close')}></div>
            <div className="modal_content">
               <div className="modal_header">
                   <div className="modal_title">Забронировать</div>
                   <div className="modal_close" onClick={event =>props.onModal(event,'close')}>×</div>

               </div>
                <div className="modal_body">

                  <Form
                      activeDateTime={props.activeDateTime}
                      onBookedAdd = {props.onBookedAdd}
                  />

                </div>
            </div>
        </div>
    )
}

export default Popup