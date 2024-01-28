import React from 'react'

const Wrapped = ({active}) => {
  return (
    <div className='wrapped' style={{visibility: active?"visible":"hidden"}}>
        <div className='image-container'>
            <img src='20230425_144058.jpg' alt='image'></img>
        </div>
        <p>
            Hello world
        </p>
    </div>
  )
}

export default Wrapped