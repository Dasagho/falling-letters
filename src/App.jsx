import './App.css'
import { useEffect } from 'react'
import { useState } from 'react';

function App() {
  const [isFinish, setIsFinish] = useState(false)
  const $width = window.innerWidth - 25
  const $height = window.innerHeight - 25

  let squares = [
    { x: 50, y: 0, width: 50, color: 'red', text: 'A' },
  ]

  function handleKeydown(event) {
    const key = event.key.toLowerCase();
    if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
      squares = squares.filter(({text}) => { console.log(`key: ${key.toUpperCase() }, text: ${text}`); text !== key.toUpperCase() })
      console.log(`key pressed ${key}`)
      squares.forEach(x => console.log(x.text))
    }
  }

  document.addEventListener('keydown', handleKeydown);

  const gameloop = setInterval(() => {
    squares.push({
      x: getRandomValue(0, $width),
      y: 0,
      width: getRandomValue(50, 400),
      color: `rgb(${getRandomValue(0, 255)} ${getRandomValue(0, 255)} ${getRandomValue(0, 255)} / 100%)`,
      text: getLetter(getRandomValue(1, 5))
    })
  }, 800)

  function endGame() {
    clearInterval(gameloop)
    setIsFinish(true)
    console.warn("end game")
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    function drawEndLine() {
      ctx.beginPath();
      ctx.moveTo(25, $height - 150);
      ctx.lineTo($width - 25, $height - 150);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }

    function drawRectangles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      squares.forEach(square => {
        ctx.fillStyle = square.color
        ctx.fillRect(square.x, square.y, square.width, square.width)

        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.fillText(square.text, square.x + (square.width / 2 - 7), square.y + (square.width / 2 + 8))

        drawEndLine()

        if (isFinish === false) square.y += 1
        if (square.y + square.width >= canvas.height) endGame()
      })

      if (!isFinish) requestAnimationFrame(drawRectangles)
    }

    drawRectangles()
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
    <canvas id="canvas" width={$width} height={$height}>
    </canvas>
  )
}

export default App
