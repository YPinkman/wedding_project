import React, { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './AIStylist.css'

interface AIStylistResponse {
  advice: string;
}

const themes = [
  { value: 'traditional', label: '传统经典' },
  { value: 'modern', label: '现代简约' },
  { value: 'garden', label: '花园清新' },
  { value: 'beach', label: '海滩浪漫' },
  { value: 'vintage', label: '复古优雅' },
]
const styles = [
  { value: 'elegant', label: '优雅庄重' },
  { value: 'casual', label: '休闲舒适' },
  { value: 'fashionable', label: '时尚前卫' },
  { value: 'bohemian', label: '波西米亚' },
  { value: 'minimalist', label: '极简主义' },
]

const AIStylist: React.FC = () => {
  const [theme, setTheme] = useState('traditional')
  const [style, setStyle] = useState('elegant')
  const [advice, setAdvice] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setAdvice(null)
    try {
      const response = await axios.get<AIStylistResponse>(`${backendUrl}/api/ai/stylist`, {
        params: { theme, style },
      })
      setAdvice(response.data.advice)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || '获取造型建议失败')
    }
    setLoading(false)
  }

  return (
    <div className="ai-stylist-container stylish-form">
      <h2>AI 婚礼氛围造型师</h2>
      <p>选择婚礼主题和您的着装风格偏好，AI将为您提供个性化的造型建议。</p>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="theme-select">婚礼主题：</label>
          <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="style-select">风格偏好：</label>
          <select id="style-select" value={style} onChange={(e) => setStyle(e.target.value)}>
            {styles.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} disabled={loading} className="stylish-button">
        {loading ? '正在生成...' : '获取造型建议'}
      </button>

      {loading && <p className="loading-message">AI 正在精心搭配，请稍候...</p>}
      {error && <p className="error-message" style={{ color: 'red' }}>错误：{error}</p>}
      {advice && (
        <div className="advice-display">
          <h3>AI造型建议：</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default AIStylist 