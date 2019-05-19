import React from 'react'
import {filter_by} from "../../../Server/Functions/Functions";
import moment from "moment/moment";


const Schedules = props => {

    if(!props.schedules.length) {
        return (
            <tr>
                <td colSpan="7">Нет расписание</td>
            </tr>
        );
    }

    return (
        <React.Fragment>
            {props.schedules.map((schedules, index) => {

                return (
                    <tr key={index}>
                        {schedules.map((weekItems, i) => {
                              const  schedule =  weekItems[index]
                              if(schedule) {

                                  const classes = [
                                      'time ' + ((schedule.dateTimeObj.dateTimeBegin >= moment().unix()) ? 'js-time': 'disabled'),
                                      'item_time__' + schedule.dateTimeObj.dateTimeBegin,
                                       filter_by(props.activeDateTime,'dateTime',schedule.dateTimeObj.dateTimeBegin).length > 0 ? 'active' : ''
                                  ]

                                  return (
                                      <td key={i} className={classes.join(' ')} title="Забронировать?"
                                          onClick={event => props.onAddBookClick(event, schedule)}>
                                          <div className="time">c {schedule.time_begin} по {schedule.time_end}</div>
                                          <div className="trainer">{schedule.staff.name}</div>
                                      </td>
                                  )

                              }else{
                                  return (
                                      <td key={i} className="time disabled">
                                      </td>
                                  )
                              }
                        })}
                    </tr>
                )
            })}

        </React.Fragment>
    )
}

export default Schedules