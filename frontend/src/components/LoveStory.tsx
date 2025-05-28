import { useState } from 'react'

const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const baseStories = [
  {
    template: '在一个{}的午后，李华与王芳因{}而邂逅。他被她{}所吸引，她为他{}所打动。从{}到{}，他们的爱意如{}般滋长。今天，他们决定将这份深情化为永恒，共赴婚姻的殿堂。',
    placeholders: [
      '阳光明媚/星光璀璨/微风习习',
      '一次共同的志愿者活动/一场有趣的辩论赛/一个偶然的图书馆角落',
      '专注而善良的眼神/独特的幽默感/对生活的热情',
      '真诚而温暖的谈吐/深邃的思考力/爽朗的笑容',
      '第一次紧张的咖啡约会/无数个深夜的长谈/一次难忘的旅行',
      '一同走过山川大海/共同克服生活挑战/分享每一个微小的喜悦',
      '春日细雨/夏日阳光/秋日硕果/冬日暖阳',
    ],
  },
  {
    template: '缘分妙不可言，李华与王芳的故事始于{}。从{}到{}，他们发现彼此是那么的契合。每一次{}都充满了{}，每一次{}都让心跳加速。这份特殊的连接，让他们跨越了{}，将虚拟的羁绊化为真挚的爱情。现在，他们将携手开启人生的新篇章。',
    placeholders: [
      '一次偶然的线上游戏/一场朋友的生日派对/一次意外的工作合作',
      '虚拟世界的并肩作战/陌生人间的初次问候/工作中的默契配合',
      '现实生活中的相知相守/敞开心扉的深入交流/携手共度的点点滴滴',
      '屏幕对话/眼神交汇/共同完成的任务',
      '欢声笑语/思想火花/温馨感动',
      '线下见面/独处时光/携手前行',
      '距离/羞涩/最初的陌生',
    ],
  },
]

export default function LoveStory() {
  const [story, setStory] = useState('请输入一些关键词，让AI为您谱写独一无二的爱情故事。')
  const [keywords, setKeywords] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function generate() {
    if (!keywords.trim()) {
      setStory('请输入一些关键词再尝试生成故事。')
      return
    }
    setIsLoading(true)
    setStory('AI 正在撰写你们的爱情故事，请稍候...')
    try {
      const keywordsList = keywords.split(/[，,、\s]+/).filter(kw => kw.trim() !== '')
      const response = await fetch(`${backendBase}/api/ai/lovestory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(keywordsList),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || '故事创作失败')
      }
      const data = await response.json()
      setStory(data.story)
    } catch (error: any) {
      setStory(`创作故事时出错：${error.message}。您可以尝试使用预设模板。`)
    }
    setIsLoading(false)
  }

  return (
    <section id="story">
      <h2>我们的爱情故事</h2>
      <p dangerouslySetInnerHTML={{ __html: story }} style={{ textIndent: '2em' }} />
      <div className="wedding-form" style={{ gridTemplateColumns: '1fr', justifyItems: 'center' }}>
        <label style={{ width: '100%' }}>
          输入关键词（逗号分隔）：
          <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="例如：一起看星星, 做饭的乐趣" />
        </label>
        <button onClick={generate} disabled={isLoading}>
          {isLoading ? 'AI撰写中...' : 'AI共创故事'}
        </button>
      </div>
    </section>
  )
} 