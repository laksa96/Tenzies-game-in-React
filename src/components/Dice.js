import React from 'react'

const Dice = (props) => {

    const {id, isHeld, value} = props

    return (
        <div onClick={() => props.handleClick(id)} className={`dice ${isHeld ? 'dice__active' : ''} rounded fs-3 fw-bold shadow-sm`}>
            {value}
        </div>
    )
}

export default Dice