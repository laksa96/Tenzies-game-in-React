import React, {useState, useEffect} from 'react'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

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

// Get time
const getTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes ? minutes + 'minutes' : ''} ${seconds} seconds`
}

const App = () => {

    // Tenzies state that represents if game is won or not
    const [tenzies, setTenzies] = useState(false)
    // Dices state that stores all dices
    const [dices, setDices] = useState(allNewDices())
    // Number of rolls state
    const [numberOfRolls, setNumberOfRolls] = useState(0)
    // Timer state
    const [timer, setTimer] = useState(0)

    // Effect that check if game is won everytime dices changes
    useEffect(() => {
        const won = (dices.every(dice => dice.value === dices[0].value && dice.isHeld === true))
        won && setTenzies(true)
    }, [dices])

    // Save record to localStorage
    useEffect(() => {
        if (tenzies) {
            if (localStorage.getItem('rolls') && localStorage.getItem('time')) {
                if (localStorage.getItem('rolls') > numberOfRolls) {
                    localStorage.setItem('rolls', numberOfRolls)
                }
                if (localStorage.getItem('time') > timer) {
                    localStorage.setItem('time', timer)
                }
            }
            else {
                localStorage.setItem('rolls', numberOfRolls)
                localStorage.setItem('time', timer)
            }
        }
    }, [tenzies])

    // Effect for timer
    useEffect(() => {
        let interval = null
        if (!tenzies) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1)
            }, 1000)
        }
        else if (tenzies) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [tenzies])

    // Button click function for re-rolling
    const rerollDices = () => {
        if (!tenzies) {
            setDices(prevDices => prevDices.map(dice => {
                return dice.isHeld === true
                ? dice
                : generateDice()
            }))
            setNumberOfRolls(prevnumberOfRolls => prevnumberOfRolls + 1)
        }
        else {
            setDices(allNewDices())
            setTenzies(false)
            setNumberOfRolls(0)
        }
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
            {tenzies && <Confetti />}
            <h1 className='fw-bold text-center'>Tenzies</h1>
            <p className='text-center fs-5 mt-2 px-4'>Roll unti all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className='d-flex justify-content-center flex-wrap gap-3 mt-4'>
                {diceElements}
            </div>
            {tenzies && <p className='fw-bold px-4 mt-3'>Number of rolls: {numberOfRolls}</p>}
            {tenzies && <p className='fw-bold px-4 mt-3'>Time taken: {getTime(timer)}</p>}
            {localStorage.getItem('rolls') && tenzies && <p className='fw-bold px-4 mt-3'>Record for best number of rolls: {localStorage.getItem('rolls')}</p>}
            {localStorage.getItem('time') && tenzies && <p className='fw-bold px-4 mt-3'>Best time record: {getTime(localStorage.getItem('time'))}</p>}
            <div className='d-flex justify-content-center mt-5'>
                <button
                    onClick={() => rerollDices()}
                    className='btn btn-primary px-5 py-1 fs-3 fw-bold'
                >
                    {tenzies ? 'New Game' : 'Roll'}
                </button>
            </div>
        </main>
    )
}

export default App