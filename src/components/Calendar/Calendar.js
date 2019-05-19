import React, {Component} from 'react'

import Week from "./Week";
import moment from 'moment'
import Schedules from "./Schedules/Schedules";
import SelectedReservation from "./Reservations/SelectedReservation";
import axios from '../../Server/Api/api'
import Popup from "./Popup/Popup";

export default class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schedulesCalendar: this.schedulesCalendar(),
            activeDateTime: JSON.parse(localStorage.getItem("dateTime")) || [],
            currentWeek: 1,
            isModalOpen: false,
            loading: true,
            data: {
                schedules: [],
                booked: JSON.parse(localStorage.getItem("fetchBooked")) || [],
            },
        }
    }

    // Функция вывод недели начинается с 1--0
    get week() {

        const WeekItem = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
        const weekObj = {}

        for (let i = 0; i < WeekItem.length; i++) {
            let weekIs = i + 1;
            weekIs = weekIs === 7 ? 0 : weekIs;
            weekObj[i] = {key:i,weekIs:weekIs,week:WeekItem[i]}
        }
        return weekObj;
    }

    /*РАСПИСАНИЕ*/
    // Формируем строку в таблице;
    get rowWeek() {
       const row = [];
       const week = this.week
       const schedules = this.state.data.schedules

        function schedulesCountRow(w) {
            let counts = 0
            Object.keys(schedules).forEach((index,key) => {
                if (schedules[key].week === w) {
                    counts++
                }
            })
            return counts
        }

        Object.keys(week).forEach((index,key) => {
            const w = week[key].weekIs
            row.push(schedulesCountRow(w))
        })

        return Math.max.apply(Math, row)
    }

    get schedulesItems() {
        const schedulesAll = []
        const schedules = this.state.data.schedules
        const schedulesCalendar = this.state.schedulesCalendar;
        const week = this.week
        const objSchedules = []
        
        function schedulesFindAll(w) {
            const items = []
            Object.keys(schedules).forEach((index,key) => {
                if (schedules[key].week === w) {
                    schedules[key].dateTimeObj = {
                        dateTimeBegin : moment(schedulesCalendar[schedules[key].week] + ' ' + schedules[key].time_begin).unix(),
                        dateTimeEnd: moment(schedulesCalendar[schedules[key].week] + ' ' + schedules[key].time_end).unix()
                    }
                    items.push(schedules[key])
                }
            })
            return items
        }

        for (let i = 0; i < this.rowWeek; i++) {
            Object.keys(week).forEach((index,key) => {
                const we = week[key].weekIs
                objSchedules[we] = schedulesFindAll(we)
                schedulesAll[i] = objSchedules
            })
        }
        return schedulesAll
    }

    dateTimeStorage = (obj,type) =>{
        const activeDateTime = this.state.activeDateTime

        if(obj && type === 'add') {
            activeDateTime.push({
                id: obj.id,
                dateTime: obj.dateTime,
                name: obj.name
            })

            const newState = Object.assign({}, this.state.activeDateTime, activeDateTime)
            this.setState(newState)

            localStorage.setItem('dateTime', JSON.stringify(activeDateTime))
        }
        if(obj && type === 'remove') {
            for (let i = 0; i < activeDateTime.length; i++) {
                if(obj.dateTime === activeDateTime[i].dateTime) {

                    activeDateTime.splice(i,1)

                    const newState = Object.assign({}, this.state.activeDateTime,activeDateTime)
                    this.setState(newState)

                    localStorage.setItem('dateTime', JSON.stringify(activeDateTime))
                }
            }
        }

        return false
    }

    // Копия стек объекта;
    newStateObj = (obj) =>{
        return Object.assign({}, this.state,obj);
    }

    // Раписание в календаря;
    schedulesCalendar = (nextWeek = 1) => {
        if(nextWeek <= 0) nextWeek = 1;
        const calendarArray = []
        const w = moment().weekday()
        const weekCol = (nextWeek * 7) - (w ? w : 7) + 1; // Количество недели;
        const slice = (nextWeek > 1 ? (nextWeek * 7) - 6 : 1); // Убираем старые недели;
        for (let i = slice - (w ? w : 7); i < weekCol; i++) {
            const dates = moment().clone().add(i,'d');
            calendarArray.push(dates.format('YYYY-MM-DD'))
        }
        return calendarArray;
    }
   
    toggleBook = (e,obj) =>{
        e.preventDefault();

        const dateTimeObj = {
            id: obj.id,
            dateTime : obj.dateTimeObj.dateTimeBegin,
            name: obj.staff.name
        }
        //
        if(e.currentTarget.classList.contains('js-time')) {
            if (e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.remove("active");
                this.dateTimeStorage(dateTimeObj, 'remove')
            } else {
                e.currentTarget.classList.add("active");
                this.dateTimeStorage(dateTimeObj, 'add')
            }
        }
    }

    removeBook =(e,obj) =>{
        e.preventDefault();
        this.dateTimeStorage(obj,'remove')
    }

    renderWeek = ()=> {
        const weekObj = this.week
        return Object.keys(weekObj).map((key,index) => {
            const weekItem = weekObj[key]
            const date = moment(this.state.schedulesCalendar[index]).format('DD.MM.YYYY')
            return(
                <Week key={index} weeIs={weekItem.weekIs} date={date}  week={weekItem.week}/>
            )
        })
    }

    // Доделать;
    bookedAdd = (activeDateTimes)=>{
        const booked = this.state.data.booked
        const newState = Object.assign({}, this.state.data.booked, activeDateTimes)
        this.setState(newState)
        // Добавляем данные Имитация БД;
        localStorage.setItem('fetchBooked', JSON.stringify(activeDateTimes))
        localStorage.removeItem('dateTime');
        return false
    }

    // Перед;
    nextCalendar = event =>{
        event.preventDefault()

        const stateControl = {...this.state}
        let i = stateControl.currentWeek + 1;

        if(i <= 6) {
            this.setState({
                stateControl,
                schedulesCalendar: this.schedulesCalendar(i),
                currentWeek: i
            })
        }
    }

    // Назад;
    prevCalendar = event =>{
        event.preventDefault()
        const stateControl = {...this.state}
        let i = stateControl.currentWeek - 1;

        if(i > 0) {
            this.setState({
                stateControl,
                schedulesCalendar: this.schedulesCalendar(i),
                currentWeek: i
            })
        }
    }

    //Модалка;
    onModal = (event,type) => {
        event.preventDefault()
        if(type === 'show') {
            const newState = Object.assign({}, this.state.isModalOpen, {isModalOpen:true})
            this.setState(newState)
        }
        if(type === 'close') {
            const newState = Object.assign({}, this.state.isModalOpen, {isModalOpen:false})
            this.setState(newState)
        }
        return null
    }

    componentDidMount() {
        // Api server schedule all JSON;
        axios.get('/schedule.json').then(response => {
            const schedules = response.data.map(value => {
                return {
                    id: value.id,
                    staff:  {
                        id: value.staff.id,
                        name: value.staff.name,
                        status: value.staff.status,
                    },
                    areas: {
                        id: value.areas.id,
                        name: value.areas.name,
                        status: value.areas.status,
                    },
                    money: value.money,
                    time_begin: value.time_begin,
                    time_end: value.time_end,
                    week: value.week,
                    value: value.value,
                    status: value.status,
                };
            });
            const newState = this.newStateObj({ data: {schedules}, loading: false,})
            this.setState(newState)
        }).catch(error => console.log(error));
        // Удаляем ппрошедшее время;
        const activeDateTime  = this.state.activeDateTime
        if(activeDateTime) {
            activeDateTime.forEach((value,key) => {
                if(value.dateTime <= moment().unix()) {
                    console.log('activeDateTime',activeDateTime);
                   // console.log('activeDateTime',moment.unix(value.dateTime).format('YYYY-MM-DD'));
                    activeDateTime.splice(key,1)
                    const newState = Object.assign({}, this.state.activeDateTime, activeDateTime)
                    this.setState(newState)
                    localStorage.setItem('dateTime', JSON.stringify(activeDateTime))
                }
            })
        }
    }

    render() {

        return (

           <div className="reservation__mod">

              <Popup
                  activeDateTime = {this.state.activeDateTime}
                  onBookedAdd = {this.bookedAdd}
                  isModalOpen={this.state.isModalOpen}
                  onModal={this.onModal.bind(this)}
              />

               <div className="title">Бронирования</div>
              <SelectedReservation
                  activeReservation = {this.state.activeDateTime}
                  onRemoveBookClick = {this.removeBook.bind(this)}
              />
                <div className="calendar">
                    <button className="prev disabled" onClick={this.prevCalendar.bind(this)}>&lt; Назад</button>
                    <button className="next" onClick={this.nextCalendar.bind(this)}>Следующий &gt;</button>
                </div>
                <table className="table-reservation">
                    <tbody>
                        <tr className="week">
                            {this.renderWeek()}
                        </tr>
                        <Schedules
                            schedules = {this.schedulesItems}
                            onAddBookClick = {this.toggleBook.bind(this)}
                            activeDateTime = {this.state.activeDateTime}
                        />
                    </tbody>
                </table>
              <div className="buttons">
                  <button className="btn-green" disabled={!this.state.activeDateTime.length} onClick={event => this.onModal(event,'show')} >Забронировать</button>
              </div>
          </div>
        )
    }
}
