const items = [
  { time: '17:00', event: '宾客签到入场 & 自由交流' },
  { time: '18:00', event: '婚礼仪式正式开始 & 交换誓词' },
  { time: '18:45', event: '晚宴开始 & 祝酒环节' },
  { time: '20:00', event: '新人敬酒 & 互动游戏' },
  { time: '21:00', event: '婚礼结束 & 欢送宾客' },
]

export default function ScheduleSection() {
  return (
    <section id="schedule">
      <h2>婚礼流程</h2>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {items.map(it => (
          <div
            key={it.time}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '15px',
              marginBottom: '15px',
              paddingLeft: '10px',
              borderLeft: '3px solid #eee',
            }}
          >
            <div style={{ color: '#b08d74', fontWeight: 'bold', minWidth: '60px', textAlign: 'right' }}>
              {it.time}
            </div>
            <div style={{ flexGrow: 1 }}>{it.event}</div>
          </div>
        ))}
      </div>
    </section>
  )
} 