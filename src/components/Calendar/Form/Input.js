import React from 'react'

function  isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {


    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    const cls = ['input-form']

    if(isInvalid(props)) {
        //cls.push(classes.error)
        cls.push('error')
    }
    return (
        <div className={cls.join(' ')}>
            <input className="input"
                   id = {htmlFor}
                   type={inputType}
                   name={props.name}
                   placeholder={props.label}
                   value = {props.value}
                   onChange = {props.onChange}
            />
            {isInvalid(props) ? <span className="error">{props.errorMessage || 'Введите верное значение'}</span> : null }
        </div>
    )
}

export default Input