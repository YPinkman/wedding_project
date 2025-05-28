export default function LocationSection() {
  return (
    <section id="location">
      <h2>婚礼地点</h2>
      <p style={{ textAlign: 'center' }}><strong>XX国际酒店 · 宴会厅</strong><br />深圳市南山区高新南一道XXXX号</p>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.473539824658!2d113.9452077149867!3d22.57193238517227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f707f10b27e7%3A0x6b4c7c8c3c7e7c8e!2sTencent%20Binhai%20Building!5e0!3m2!1sen!2scn!4v1678901234567!5m2!1sen!2scn"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
} 