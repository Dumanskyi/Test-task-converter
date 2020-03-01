import React from 'react';
import './loader.scss'

const Loader = props => (
    <div className='loader-wrapper'>
        <div className="lds-spinner">  
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>    
)

export default Loader