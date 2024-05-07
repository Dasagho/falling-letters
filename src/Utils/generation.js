import { $width } from "../Canvas/draw"

export function genRandomSquare() {
  let x, width, color, text

  width = getRandomValue(50, 400)
  color = `rgb(${getRandomValue(0, 255)} ${getRandomValue(0, 255)} ${getRandomValue(0, 255)} / 100%)`
  text = getLetter(getRandomValue(1, 5))
  x = getRandomValue(0, $width)

  if (x > $width - width) x = $width - width
  return { 
    x,
    y: 0, 
    width, 
    color, 
    text 
  }
}

function getRandomValue(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
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