import { ImageResponse } from 'next/og'

export const alt = 'Lorenzo Zubani, Frontend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: '#ededed',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', gap: 14, fontSize: 40, fontWeight: 600 }}>
          <span>L</span>
          <span>Z</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              gap: 28,
              fontSize: 150,
              fontWeight: 600,
              letterSpacing: -8,
              lineHeight: 1,
            }}
          >
            <span>Lorenzo</span>
            <span style={{ color: '#6fd08c' }}>Zubani</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: '#a3a3a3' }}>
            Frontend Engineer · React and TypeScript
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#8d8d8d' }}>zubo.dev</div>
      </div>
    ),
    size,
  )
}
