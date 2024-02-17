import React from 'react'
import './ButtonComponent.css';

function ButtonComponent(props) {
    // const handleClick = () => {
    //     console.log("clicked");
    // }
    const label = props.label
    const change = props.change
    const disabled = props.disabled
  return (
    <div>
        <button className='buttonStyle' onClick={change} disabled={disabled}>{label}</button>
    </div>
  )
}

export default ButtonComponent