import { useState } from 'react'

interface RSVPData {
  name: string
  attending: string
  guests: number
  dietary: string
  message: string
}

const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPData>({
    name: '',
    attending: '',
    guests: 1,
    dietary: '',
    message: '',
  })
  const [info, setInfo] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        attending: form.attending === 'yes',
        guests: Number(form.guests),
      }
      const res = await fetch(`${backendBase}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      setInfo('提交成功，感谢您的回执！')
      setForm({ name: '', attending: '', guests: 1, dietary: '', message: '' })
    } catch (err: any) {
      setInfo('提交失败: ' + err.message)
    }
  }

  return (
    <section id="rsvp">
      <h2>出席回执</h2>
      <form className="wedding-form" onSubmit={handleSubmit}>
        <label>
          姓名：
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          是否出席：
          <select name="attending" value={form.attending} onChange={handleChange} required>
            <option value="">请选择</option>
            <option value="yes">欣然前往</option>
            <option value="no">抱歉无法出席</option>
          </select>
        </label>
        <label>
          同行人数：
          <input type="number" name="guests" min={1} value={form.guests} onChange={handleChange} required />
        </label>
        <label>
          饮食需求：
          <input name="dietary" value={form.dietary} onChange={handleChange} />
        </label>
        <label>
          留言：
          <textarea name="message" value={form.message} onChange={handleChange} />
        </label>
        <button type="submit">提交</button>
      </form>
      {info && <p style={{ color: '#b08d74', fontWeight: 'bold' }}>{info}</p>}
    </section>
  )
} 