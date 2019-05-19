import React, { Component } from 'react';
import './components/Calendar/Reservation.css';
import Calendar from "./components/Calendar/Calendar";



class App extends Component {
  render() {
    return (
      <div className="App">

              <Calendar/>
              <br/>
              <br/>
              {/*<table className="table-reservation">*/}
                  {/*<tbody>*/}
                  {/*<tr className="week">*/}
                      {/*<th>*/}
                          {/*Пн*/}
                          {/*<div className="data_time">02.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                          {/*Вт*/}
                          {/*<div className="data_time">03.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th className="current">*/}
                          {/*Ср*/}
                          {/*<div className="data_time">04.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                          {/*Чт*/}
                          {/*<div className="data_time">05.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                          {/*Пт*/}
                          {/*<div className="data_time">06.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                          {/*Сб*/}
                          {/*<div className="data_time">07.04.2018</div>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                          {/*Вс*/}
                          {/*<div className="data_time">08.04.2018</div>*/}
                      {/*</th>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time disabled" title="Занято!">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                          {/*<div className="trainer">Терапевт</div>*/}
                          {/*<div className="text-center">Занято!</div>*/}
                      {/*</td>*/}
                      {/*<td className="time open">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                          {/*<div className="trainer">Терапевт</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                          {/*<div className="trainer">Терапевт</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                          {/*<div className="trainer">Терапевт</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time open">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time disabled"></td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time disabled" title="Занято!">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                          {/*<div className="text-center">Занято!</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                      {/*<td className="time" title="Забронировать?">*/}
                          {/*<div className="time">c 16:00 по 16:30</div>*/}
                          {/*<div className="trainer">Иванова Даша</div>*/}
                      {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
              {/*</table>*/}
      </div>
    );
  }
}

export default App;
