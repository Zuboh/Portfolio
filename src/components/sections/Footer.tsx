import { Container } from '@/components/ui/Container'

export function Footer({ lastUpdated }: { lastUpdated?: string | null }) {
  return (
    <footer className="mt-[136px] border-t border-bd pt-7 pb-14 text-[13px] text-tx3 max-md:mt-24">
      <Container className="flex flex-wrap justify-between gap-2">
        <span>Lorenzo Zubani · Brescia, Italy</span>
        {lastUpdated && <span>Updated {lastUpdated}</span>}
      </Container>
    </footer>
  )
}
