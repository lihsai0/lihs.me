import React, { useEffect, useRef } from 'react'

class SnakeRender {
  private ctx2d: CanvasRenderingContext2D
  private sn: number[]
  private dz: number
  private fx: number
  private n: number

  constructor(ctx2d: CanvasRenderingContext2D) {
    this.ctx2d = ctx2d
    this.sn = [42, 41]
    this.dz = 43
    this.fx = 1
    this.n = 0
  }

  private draw(t: number, c: string) {
    this.ctx2d.fillStyle = c
    this.ctx2d.fillRect(t % 20 * 20 + 1, ~~(t / 20) * 20 + 1, 18, 18)
  }

  private end() {
    this.ctx2d.fillStyle = 'black'
    this.ctx2d.fillRect(0, 0, 1000, 1000)
    this.sn = [42, 41]
    this.dz = 43
    this.fx = 1
    this.n = 0
  }

  public handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
    const { sn, fx } = this
    const n = this.n = [-1, -20, 1, 20][e.keyCode - 37] || fx
    this.fx = sn[1] - sn[0] == n ? fx : n
  }

  private run = () => {
    const { sn, fx } = this
    const n = this.n = sn[0] + fx
    sn.unshift(this.n)
    if (sn.indexOf(n, 1) > 0 || n < 0 || n > 399 || fx == 1 && n % 20 == 0 || fx == -1 && n % 20 == 19) {
      alert('game over')
      this.end()
      return
    }
    this.draw(n, 'Lime')
    if (n == this.dz) {
      let dz
      do {
        dz = this.dz = ~~(Math.random() * 400)
      } while (sn.indexOf(dz) >= 0)
      this.draw(dz, 'Yellow')
    } else {
      this.draw(sn.pop() || 0, 'Black')
    }
    setTimeout(this.run, 130)
  }

  public start() {
    this.run()
  }
}

const Snake: React.FC = () => {
  let snakeRender: SnakeRender
  let handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    snakeRender && snakeRender.handleKeyDown(e)
  }
  let handleFocus = () => {
    snakeRender.start()
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(
    () => {
      if (!canvasRef.current) {
        return
      }
      const ctx2d = canvasRef.current.getContext('2d')
      if (!ctx2d) {
        return
      }
      snakeRender = new SnakeRender(ctx2d)
    },
    []
  )

  return (
    <>
      <h2>贪吃蛇</h2>
      <canvas
        width='400'
        height='400'
        style={{ background: 'Black' }}
        ref={canvasRef}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
    </>
  )
}

export default Snake
