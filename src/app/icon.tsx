import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: '7px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            A
          </span>
          <span
            style={{
              color: '#2563eb',
              fontSize: 22,
              fontWeight: 900,
              marginBottom: -1,
            }}
          >
            .
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
