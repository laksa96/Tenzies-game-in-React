import React from 'react'
import Dice from './components/Dice'

const App = () => {
    return (
        <main className='app bg-light rounded p-4'>
            <h1 className='fw-bold text-center'>Tenzies</h1>
            <p className='text-center fs-5 mt-2 px-4'>Roll unti all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className='d-flex justify-content-center flex-wrap gap-3 mt-4'>
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
                <Dice />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-primary px-5 py-1 fs-3 fw-bold'>Roll</button>
            </div>
        </main>
    )
}

export default App