import React from 'react';
import './input.scss'

const Input = props => {

    return (
        <div className='info-line'>
            <label htmlFor="name">{props.parameter}</label><br />
            <input 
              type={props.type} 
              id={props.parameter} 
              name={props.parameter} 
              placeholder={props.placeholder} 
              value={props.value}
              onChange={props.onChange}
              pattern={props.pattern}
            />
        </div>
    )
}

export default Input;