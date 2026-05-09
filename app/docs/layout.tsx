import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Component Library · Illumine 2026',
  description:
    'Internal UI component docs — previews, usage code, and prop references for every reusable component in the Illumine 2026 codebase.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
