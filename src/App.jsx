import './App.css'
import { useEffect, useRef, useState } from 'react'
import { genRandomSquare } from './Utils/generation'
import { $height, $width, drawCanvas } from './Canvas/draw'
const GEN_SQUARE_INTERVAL = 1000

function App() {
  const [score, setScore] = useState(0)
  const squareRef = useRef([{ x: 50, y: 0, width: 50, color: 'red', text: 'A' }])
  const lostSquareRef = useRef([])
  const canvasRef = useRef(null)
  const desiredFPS = 60
  const frameDuration = 1000 / desiredFPS
  const animationId = useRef()
  let lastFrameTime = 0
  let gameloop

  function handleKeydown(event) {
    const key = event.key.toUpperCase()
    if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
      const prevLength = squareRef.current.length
      squareRef.current = squareRef.current.filter(square => square.text !== key.toUpperCase())
      const newLength = squareRef.current.length

      setScore(prevState => prevState + (prevLength - newLength))
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    gameloop = setInterval(() => {
      const newSquare = genRandomSquare()
      squareRef.current.push(newSquare)
    }, GEN_SQUARE_INTERVAL)

    canvasRef.current.focus()
    // canvasRef.current.onKeyDown = handleKeydown
    animationId.current = requestAnimationFrame(animate)

    return () => {
      clearInterval(gameloop)
      window.cancelAnimationFrame(animationId.current)
      canvasRef.current.onKeyDown = null
      console.warn("Game cleanup done")
    }
  }, [])

  function animate(timestamp) {
    if (timestamp - lastFrameTime >= frameDuration) {
      drawCanvas(canvasRef.current, squareRef.current, lostSquareRef.current)
      lastFrameTime = timestamp
    }

    if (lostSquareRef.current.length < 20) {
      animationId.current = requestAnimationFrame(animate)
    } else {
      endGame()
    }
  }

  function endGame() {
    window.cancelAnimationFrame(animationId.current)
    clearInterval(gameloop)
    canvasRef.current.onKeyDown = null
    console.warn("end game")
  }

  return (
    <>
      <canvas
        tabIndex="0"
        onKeyDown={handleKeydown}
        ref={canvasRef}
        width={$width}
        height={$height}
      >
      </canvas>
      <aside>
        <span>Score: {score}</span>
      </aside>
    </>
  )
}

export default App
