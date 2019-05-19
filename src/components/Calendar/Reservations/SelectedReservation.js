import React from 'react'
import moment from 'moment'

const SelectedReservation = props => {
    if(props.activeReservation) {
        return (
            <div className="selected_reservation">
                {props.activeReservation.map((Reservation, index) => {

                    return (
                        <div className="item active" key={index} onClick={event => props.onRemoveBookClick(event,Reservation)}>
                            <div className="time">{moment.unix(Reservation.dateTime).format('DD.MM.YYYY')} - {moment.unix(Reservation.dateTime).format('HH:mm')}</div>
                            <div className="trainer">{Reservation.name}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SelectedReservation