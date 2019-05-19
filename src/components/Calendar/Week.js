import React from 'react'
import moment from 'moment'

const Week = props => {

    return (
        <React.Fragment>
            <th className={(props.date === moment().format('DD.MM.YYYY')) ? 'current':''}>
                {props.week}
                <div className="data_time">{props.date}</div>
            </th>
        </React.Fragment>
    )
}

export default Week