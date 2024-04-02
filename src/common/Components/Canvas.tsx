import { useEffect, useRef } from 'react'

const Canvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas: HTMLCanvasElement = canvasRef.current
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            // Additional canvas setup...
            drawGradient(canvas.height, canvas.width)
        }
    }, [])

    const drawGradient = (height: number, width: number) => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
        const context = canvas?.getContext('2d')
        if (!canvas || !context) return console.error('Canvas not found')

        let linearGradient = context.createLinearGradient(0, 0, width, 0)
        let linearGradient2 = context.createLinearGradient(0, 0, 0, height)
        let linearGradient3 = context.createLinearGradient(0, 0, width, height)

        linearGradient.addColorStop(0, '#EADFB4')
        linearGradient.addColorStop(1, '#F6995C')
        linearGradient2.addColorStop(0, 'rgba(255,255,255,0)')
        linearGradient2.addColorStop(1, '#51829B')
        linearGradient3.addColorStop(0, 'rgba(255,255,255,0)')
        linearGradient3.addColorStop(1, '#9BB0C1')

        context.fillStyle = linearGradient
        context.fillRect(0, 0, width, height)
        context.fillStyle = linearGradient2
        context.fillRect(0, 0, width, height)
        context.fillStyle = linearGradient3
        context.fillRect(0, 0, width, height)
    }

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} id={'myCanvas'} />
}
export default Canvas
