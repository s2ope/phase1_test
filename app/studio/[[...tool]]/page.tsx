'use client'

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

const Studio = dynamic(
  () => import('sanity').then((mod) => mod.Studio),
  { ssr: false }
)

export default function StudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={config} />
    </div>
  )
}