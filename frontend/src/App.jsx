import { useState, useEffect } from 'react'
import sound from './assets/sound.png'
import mic from './assets/microphone.png'
import axios from 'axios'

function App() {

  const [start, setStart] = useState(false)
  const [src, setSrc] = useState('tempaudio')

  const grabAudio = async () => {
    const data = await axios.get('http://localhost:4000/api/v1/random')
    const newSrc = await data.data.audio
    setSrc(newSrc)
  }

  const handleStart = () => {
    grabAudio()
    setStart(true)

  }

  return (
    <>
      <div className='max-w-7xl mx-auto mt-12 relative'>

        <div className={`w-full h-full absolute opacity-50 rounded-xl  ${!start ? 'z-10 bg-gray-400' : ''}`}></div>

        {!start && <button className='absolute top-20 right-20 bg-green-600 hover:bg-green-500 p-6 rounded-lg text-white text-2xl z-30' onClick={handleStart}>Start</button>}

        <div className="bg-orange-300 py-16 rounded-2xl relative">
          <h1 className="text-3xl font-bold text-center my-8 text-white">Spelling Bee</h1>
          <div className="flex flex-col items-center gap-5">
            <div className='bg-gray-100 p-7 rounded-lg'>
              <img src={sound} />
              <audio id="sound" autoPlay src={src}>Your browser does not support audio</audio>
            </div>
            <div>
              <div>
                <input className='p-4 rounded-md w-96 text-3xl' type="text" placeholder="Type answer here" />
              </div>
            </div>
            <div className='flex rounded-lg justify-center p-8 bg-blue-400'>
              <div className='bg-slate-200 rounded-xl p-3'>
                <img src={mic} width='300' className='' />
              </div>
              <div className='p-6 text-left text-lg flex flex-col justify-between'>
                <div className='font-thin text-3xl text-white'>
                  <p className='my-4'>Can you please repeat the word?</p>
                  <p className='my-4'>May I have the definition?</p>
                  <p className='my-4'>May I please have the part of speech?</p>
                </div>
                <div>
                  <button className='bg-orange-400 py-3 px-6 rounded-xl text-white font-semibold hover:opacity-95'>SPELL</button>
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
