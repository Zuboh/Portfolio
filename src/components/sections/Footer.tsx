interface FooterProps {
  lastUpdated?: string | null
}

export function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="mt-8 pt-3 border-t-[0.5px] border-bd">
      <div className="flex justify-between text-[10px] text-tx3 tracking-[.06em]">
        <span>zubo.dev &nbsp;·&nbsp; Brescia, Italy</span>
        {lastUpdated && <span>updated {lastUpdated}</span>}
      </div>
    </footer>
  )
}
