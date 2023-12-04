import { useState, useRef, useEffect } from 'react'
import sound from './assets/sound.png'
import mic from './assets/microphone.png'
import axios from 'axios'

function App() {

  const [start, setStart] = useState(false)
  const [src, setSrc] = useState('tempaudio')
  const [currentWord, setCurrentWord] = useState('old')
  const [showInput, setShowInput] = useState(false)

  const inputRef = useRef(null)

  const audio = document.getElementById("sound")
  const definition = document.getElementById("definition")
  const spell = document.getElementById("input")
  const partOfSpeech = document.getElementById("part-of-speech")

  const grabWord = async () => {
    axios.get('http://localhost:4000/api/v1/random')
      .then(res => {
        // console.log(res.data.word)
        const newWord = res.data
        setCurrentWord(newWord)
        const newSrc = res.data.audio
        setSrc(newSrc)
      })
      .catch(err => console.log(err))
  }

  const handleStart = () => {
    grabWord()
    setStart(true)
    blink()
  }

  const check = () => {
    const userInput = inputRef.current.value
    if (userInput.toLowerCase() == currentWord.word) console.log("Correct")
    else console.log("Wrong")
  }

  const blink = () => {
    const soundIcon = document.getElementById("soundIcon")
    soundIcon.classList.toggle("sound")
    setTimeout(() => {
      soundIcon.classList.toggle("sound")
    }, 1000)
  }

  const handleRepeat = () => {
    audio.play()
    blink()
  }

  const handleDefinition = () => {
    definition.innerText = `Definition: ${currentWord.definitions[0].definition}`
  }

  const handlePartOfSpeech = () => {
    partOfSpeech.innerText = `Part of speech: ${currentWord.definitions[0].partofSpeech}`
  }

  const handleGetNew = () => {
    grabWord()
    blink()
  }

  const handleSpell = () => {
    setShowInput(prev => !prev)
  }

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <>

      <div className='max-w-7xl mx-auto mt-12 relative'>

        <div className={`w-full h-full absolute opacity-50 rounded-xl  ${!start ? 'z-10 bg-gray-400' : ''}`}></div>

        {!start && <button className='absolute top-20 right-20 bg-green-600 hover:bg-green-500 p-6 text-white text-2xl z-30' onClick={handleStart}>Start</button>}

        <div className="bg-orange-300 py-16 rounded-2xl relative">
          <h1 className="text-3xl font-bold text-center my-8 text-white">Spelling Bee</h1>
          <div className="flex flex-col items-center gap-5">
            <div className='bg-gray-100 p-2 rounded-lg' id="soundIcon">
              <img src={sound} />
              <audio id="sound" autoPlay src={src}>Your browser does not support audio</audio>
            </div>
            <button onClick={handleGetNew} className='p-6 bg-red-500 cursor-pointer'>Get new</button>


            {showInput &&
              <div className='flex'>
                <input className='p-4 w-96 text-3xl' type="text" ref={inputRef} id="input" placeholder="Spell the word" />
                <button className='bg-white p-6 ml-4' onClick={check}>Check</button>
              </div>
            }


            <div className='text-lg'>
              <p id="definition"></p>
            </div>

            <div>
              <p id="part-of-speech"></p>
            </div>


            <div className='flex rounded-lg justify-center p-12 bg-blue-400'>
              <div className='bg-slate-200 rounded-xl p-3'>
                <img src={mic} width='300' className='' />
              </div>
              <div className='p-14 text-left text-lg flex flex-col justify-between'>
                <div className='font-thin text-3xl text-white '>
                  <p className='my-4 option' onClick={handleRepeat}>Can you please repeat the word?</p>
                  <p className='my-4  option' onClick={handleDefinition}>May I have the definition?</p>
                  <p className='my-4  option' onClick={handlePartOfSpeech}>May I please have the part of speech?</p>
                </div>
                <div>
                  <button className='bg-orange-400 py-3 px-6 text-white font-semibold hover:opacity-95' onClick={handleSpell}>SPELL</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
