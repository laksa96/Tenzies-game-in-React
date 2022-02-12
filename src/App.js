import React, {useState} from 'react'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'

const App = () => {

    // Generate single dice
    const generateDice = () => {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid() 
        }
    }

    // Generate array of 10 random numbers from 1-6
    const allNewDices = () => {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(generateDice())
        }
        return arr
    }

    // Dices state
    const [dices, setDices] = useState(allNewDices())

    // Button click function for re-rolling
    const rerollDices = () => {
        setDices(prevDices => prevDices.map(dice => {
            return dice.isHeld === true
            ? dice
            : generateDice()
        }))
    }

    // Toggle isHeld state on clicked dice
    const holdDice = (id) => {
        setDices(prevDices => prevDices.map(dice => {
            return dice.id === id
            ? {...dice, isHeld: !dice.isHeld}
            : dice
        }))
    }

    // Map over array of dices from state and generate Dice components
    const diceElements = dices.map(dice => 
        <Dice 
            key={dice.id}
            id={dice.id} 
            value={dice.value} 
            isHeld={dice.isHeld} 
            handleClick={(id) => holdDice(id)} 
        />
    )

    return (
        <main className='app bg-light rounded p-4'>
            <h1 className='fw-bold text-center'>Tenzies</h1>
            <p className='text-center fs-5 mt-2 px-4'>Roll unti all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className='d-flex justify-content-center flex-wrap gap-3 mt-4'>
                {diceElements}
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <button onClick={() => rerollDices()} className='btn btn-primary px-5 py-1 fs-3 fw-bold'>Roll</button>
            </div>
        </main>
    )
}

export default App