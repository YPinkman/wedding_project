import { useEffect, useState } from 'react'

interface Blessing {
  id?: number
  name: string
  content: string
  created_at?: string
}

const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function BlessingForm() {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [list, setList] = useState<Blessing[]>([])
  const [info, setInfo] = useState('')

  async function fetchBlessings() {
    const res = await fetch(`${backendBase}/api/blessing`)
    if (res.ok) {
      setList(await res.json())
    }
  }

  useEffect(() => {
    fetchBlessings()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    try {
      const payload: Blessing = { name: name || '匿名', content }
      const res = await fetch(`${backendBase}/api/blessing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      setContent('')
      setInfo('祝福已送达！')
      fetchBlessings()
    } catch (err: any) {
      setInfo('发送失败: ' + err.message)
    }
  }

  return (
    <section id="blessings">
      <h2>祝福留言</h2>
      <form className="wedding-form" onSubmit={handleSubmit}>
        <label>
          您的名字：
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          祝福：
          <textarea value={content} onChange={e => setContent(e.target.value)} required />
        </label>
        <button type="submit">发送祝福</button>
      </form>
      {info && <p style={{ color: '#b08d74', fontWeight: 'bold' }}>{info}</p>}
      <ul className="blessing-list">
        {list.map(b => (
          <li key={b.id} className="blessing-item">{b.name}：{b.content}</li>
        ))}
      </ul>
    </section>
  )
} 