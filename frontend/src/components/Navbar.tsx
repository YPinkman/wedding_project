export default function Navbar() {
  const links = [
    { href: '#hero', label: '首页' },
    { href: '#countdown', label: '倒计时' },
    { href: '#story', label: '爱情故事' },
    { href: '#photos', label: '甜蜜瞬间' },
    { href: '#schedule', label: '婚礼流程' },
    { href: '#location', label: '地点' },
    { href: '#ai-stylist', label: 'AI造型师' },
    { href: '#rsvp', label: '出席回执' },
    { href: '#blessings', label: '祝福留言' },
  ]
  return (
    <nav>
      {links.map(l => (
        <a key={l.href} href={l.href}>{l.label}</a>
      ))}
    </nav>
  )
} 