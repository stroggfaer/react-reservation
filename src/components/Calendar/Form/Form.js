import React, {Component} from 'react'
import Input from "./Input";
import moment from "moment/moment";


export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                name: {
                    value: '',
                    type: 'text',
                    label: 'Имя',
                    name: 'name',
                    errorMessage: 'Введите Имя',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                    }
                },
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    name: 'email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
            }
        }
    }

    submitHandler = event => {
        event.preventDefault()
        const formControls =  {...this.state.formControls}
        const {name, email} = this.state.formControls
        const activeDateTimes = this.props.activeDateTime
       // const calendar = Calendar;

        // Вылидация  формы;
        Object.keys(formControls).forEach((controlName,key) => {
            const control = {...formControls[controlName]}
            const validate = this.validateControl(control.value, control.validation)

            control.valid = validate.status
            control.touched = true
            control.errorMessage = (control.errorMessage ? control.errorMessage : validate.errorMessage)
            formControls[controlName] = control

            this.setState({
                formControls
            })
        })

        // если все хорошо бронируем данные;
        if(name.valid && email.valid && activeDateTimes) {

            // Формируем;
            Object.keys(activeDateTimes).forEach((value,key) => {
                const activeDateTime =  activeDateTimes[value];
                activeDateTime.booked = 1;
                activeDateTime.user = {
                    name: name.value,
                    email: email.value,
                }
                activeDateTime.create_date = moment().format('YYYY-MM-DD');
                activeDateTime.status = 1
            })

            this.props.onBookedAdd(activeDateTimes);
            // // TODO: Посмотреть;
            // const newState = Object.assign({}, calendar.state, activeDateTimes);
            // calendar.setState(newState);
            //
            // console.log('booked',booked)
            /*
            // Добавляем данные Имитация БД;
            localStorage.setItem('fetchBooked', JSON.stringify(booked))
            localStorage.removeItem('dateTime');
            */

            alert('Успешно забронировали');

        }

    }

    onChangeHandler = (event, controlName) => {
        const formControls =  {...this.state.formControls}
        const control = {...formControls[controlName]}
        const validate = this.validateControl(event.target.value, control.validation)

        control.value = event.target.value
        control.valid = validate.status
        control.touched = true
        control.errorMessage = (control.errorMessage ? control.errorMessage : validate.errorMessage)

        formControls[controlName] = control

        this.setState({
            formControls
        })
    }


    // Правило валидация!
    validateControl(value, validation) {
        const data = {
            'status': true,
            'errorMessage': ''
        }

        if(!validation) {
            return data
        }

        if(validation.required) {
            if(value.trim() === '' && data.status){
                data.status = false
                data.errorMessage = 'формы не должен быть пустым'
            }
        }

        if(validation.email) {
            let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if(!reg.test(value) && data.status) {
                data.status = false
                data.errorMessage = 'Введите корректный email'
            }
        }
        return data
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key = {controlName + index}
                    type = {control.type}
                    name = {control.name}
                    value = {control.value}
                    label = {control.label}
                    valid = {control.valid}
                    touched = {control.touched}
                    shouldValidate = {!!control.validation} // !! - принемает болевой значение
                    errorMessage = {control.errorMessage}
                    onChange = {event => this.onChangeHandler(event, controlName)}
                />
            )
        })

    }


    render() {

        return (
            <div>
                <form className="form__mod" action=""  onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <div className="buttons">
                        <button type="submit" className="btn-green" >Отправить</button>
                    </div>
                </form>
            </div>
        )
    }
}