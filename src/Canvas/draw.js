export const $width = window.innerWidth - 325
export const $height = window.innerHeight - 25

export function drawCanvas(canvas, squares, lostSquares) {
    const ctx = canvas.getContext('2d')
    let isLostSquare = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawEndLine(ctx)
    isLostSquare = drawRectangles(ctx, squares, lostSquares)
    drawLostRectangles(ctx, lostSquares)
    return isLostSquare
}

function drawRectangles(ctx, squares, lostSquares) {
    let isLostSquare = false
    for(let i = 0; i < squares.length; i++) {
        const square = squares[i]
        ctx.fillStyle = square.color
        ctx.fillRect(square.x, square.y, square.width, square.width)

        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.fillText(square.text, square.x + (square.width / 2 - 7), square.y + (square.width / 2 + 8))

        square.y += 1
        if (square.y + square.width >= $height - 150) {
            lostSquares.push(square)
            squares.splice(i, 1)
            i--
            isLostSquare = true  
        } 
    }

    return isLostSquare
}

function drawLostRectangles(ctx, lostSquares) {
    for(let i = 0; i < lostSquares.length; i++) {
        const square = lostSquares[i]
        ctx.fillStyle = square.color
        ctx.fillRect(square.x, square.y, square.width, square.width)

        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.fillText(square.text, square.x + (square.width / 2 - 7), square.y + (square.width / 2 + 8))
    }
}

function drawEndLine(ctx) {
    ctx.beginPath()
    ctx.moveTo(25, $height - 150)
    ctx.lineTo($width - 25, $height - 150)
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
}