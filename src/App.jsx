import './App.css'
import { useEffect, useRef } from 'react'

function App() {
  const squareRef = useRef([{ x: 50, y: 0, width: 50, color: 'red', text: 'A' }])
  const canvasRef = useRef(null)
  const $width = window.innerWidth - 25
  const $height = window.innerHeight - 25
  const desiredFPS = 120;
  const frameDuration = 1000 / desiredFPS;
  const animationId = useRef()
  let lastFrameTime = 0;

  function handleKeydown(event) {
    const key = event.key.toUpperCase();
    if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
      squareRef.current = squareRef.current.filter(square => square.text !== key.toUpperCase())
    }
  }

  const gameloop = setInterval(() => {
    squareRef.current.push({
      x: getRandomValue(0, $width),
      y: 0,
      width: getRandomValue(50, 400),
      color: `rgb(${getRandomValue(0, 255)} ${getRandomValue(0, 255)} ${getRandomValue(0, 255)} / 100%)`,
      text: getLetter(getRandomValue(1, 5))
    })
  }, 2000)

  function endGame() {
    window.cancelAnimationFrame(animationId.current)
    clearInterval(gameloop)
    canvasRef.current.onKeyDown = null
    console.warn("end game")
  }

  function drawRectangles(ctx, canvas) {
    let isFinish = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawEndLine(ctx)

    squareRef.current.forEach(square => {
      ctx.fillStyle = square.color
      ctx.fillRect(square.x, square.y, square.width, square.width)

      ctx.fillStyle = 'white'
      ctx.font = '20px Arial'
      ctx.fillText(square.text, square.x + (square.width / 2 - 7), square.y + (square.width / 2 + 8))

      square.y += 1
      if (square.y + square.width >= $height - 150) isFinish = true
    })
    return isFinish
  }

  function drawEndLine(ctx) {
    ctx.beginPath()
    ctx.moveTo(25, $height - 150)
    ctx.lineTo($width - 25, $height - 150)
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
  }

  function animate(timestamp) {
    let isFinish
    if (timestamp - lastFrameTime >= frameDuration) {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        isFinish = drawRectangles(ctx, canvas)
        lastFrameTime = timestamp
      }
    }
    if (!isFinish) {
      animationId.current = requestAnimationFrame(animate)
    } else {
      endGame()
    }
  }

  useEffect(() => {
    canvasRef.current.focus()
    canvasRef.current.onKeyDown = handleKeydown
    animationId.current = requestAnimationFrame(animate)
  }, [])


  function getRandomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLetter(index) {
    const letterMatch = {
      1: 'A',
      2: 'B',
      3: 'C',
      4: 'D',
      5: 'E'
    }

    return letterMatch[index]
  }

  return (
    <canvas tabIndex="0" onKeyDown={handleKeydown} ref={canvasRef} width={$width} height={$height}>
    </canvas>
  )
}

export default App
