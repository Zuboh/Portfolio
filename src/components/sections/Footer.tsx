import { Container } from '@/components/ui/Container'

export function Footer({
  lastUpdated,
  labels,
}: {
  lastUpdated?: string | null
  labels: { location: string; updated: string }
}) {
  return (
    <footer className="mt-[136px] border-t border-bd pt-7 pb-14 text-[13px] text-tx3 max-md:mt-24">
      <Container className="flex flex-wrap justify-between gap-2">
        <span>{labels.location}</span>
        {lastUpdated && (
          <span>
            {labels.updated} {lastUpdated}
          </span>
        )}
      </Container>
    </footer>
  )
}
