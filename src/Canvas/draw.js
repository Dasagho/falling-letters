export const $width = window.innerWidth - 25
export const $height = window.innerHeight - 25

export function drawCanvas(canvas, squares) {
    const ctx = canvas.getContext('2d')
    let isFinish = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawEndLine(ctx)
    isFinish = drawRectangles(ctx, squares)
    
    return isFinish
}

function drawRectangles(ctx, squares) {
    for(let square of squares) {
        ctx.fillStyle = square.color
        ctx.fillRect(square.x, square.y, square.width, square.width)

        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.fillText(square.text, square.x + (square.width / 2 - 7), square.y + (square.width / 2 + 8))

        square.y += 1
        if (square.y + square.width >= $height - 150) return true
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