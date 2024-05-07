import './App.css'
import { useEffect, useRef } from 'react'
import { genRandomSquare } from './Utils/generation'
import { $height, $width, drawCanvas } from './Canvas/draw'
const GEN_SQUARE_INTERVAL = 500

function App() {
  const squareRef = useRef([{ x: 50, y: 0, width: 50, color: 'red', text: 'A' }])
  const canvasRef = useRef(null)
  const desiredFPS = 60
  const frameDuration = 1000 / desiredFPS
  const animationId = useRef()
  let lastFrameTime = 0
  let score = 0

  function handleKeydown(event) {
    const key = event.key.toUpperCase()
    if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
      squareRef.current = squareRef.current.filter(square => square.text !== key.toUpperCase())
    }
  }

  const gameloop = setInterval(() => {
    const newSquare = genRandomSquare()
    squareRef.current.push({
      x: newSquare.x,
      y: 0,
      width: newSquare.width,
      color: newSquare.color,
      text: newSquare.text
    })
  }, GEN_SQUARE_INTERVAL)

  useEffect(() => {
    canvasRef.current.focus()
    // canvasRef.current.onKeyDown = handleKeydown
    animationId.current = requestAnimationFrame(animate)
  }, [])

  function animate(timestamp) {
    let isFinish
    if (timestamp - lastFrameTime >= frameDuration) {
      isFinish = drawCanvas(canvasRef.current, squareRef.current)
      lastFrameTime = timestamp
    }

    if (!isFinish) {
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
