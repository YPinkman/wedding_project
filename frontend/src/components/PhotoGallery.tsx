const images = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/300/300?random=${102 + i}`)

export default function PhotoGallery() {
  return (
    <section id="photos">
      <h2>甜蜜瞬间</h2>
      <div style={{ columnCount: 3, columnGap: 15 }}>
        {images.map(src => (
          <img key={src} src={src} style={{ width: '100%', borderRadius: 8, marginBottom: 15 }} />
        ))}
      </div>
    </section>
  )
} 