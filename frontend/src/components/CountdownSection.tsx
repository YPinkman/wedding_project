import { useEffect, useState } from 'react'

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

export default function CountdownSection() {
  const target = new Date('2024-10-20T18:00:00').getTime()
  const [left, setLeft] = useState<TimeLeft>(calc())

  function calc(): TimeLeft {
    const now = Date.now()
    let diff = target - now
    if (diff < 0) diff = 0
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown">
      <h2>距离婚礼还有 …</h2>
      <p style={{ fontSize: '1.5em', color: '#b08d74', fontWeight: 'bold' }}>
        {left.days.toString().padStart(2, '0')} 天 {left.hours.toString().padStart(2, '0')} 小时 {left.minutes.toString().padStart(2, '0')} 分 {left.seconds.toString().padStart(2, '0')} 秒
      </p>
    </section>
  )
} 