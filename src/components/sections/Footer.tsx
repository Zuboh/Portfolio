interface FooterProps {
  lastUpdated?: string | null
}

export function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="mt-8 pt-3 border-t-[0.5px] border-bd text-[10px] text-tx3 tracking-[.06em]">
      <div className="flex justify-between">
        <span>zubo.dev · Brescia, Italy</span>
        {lastUpdated && <span>last updated {lastUpdated}</span>}
      </div>
      <div className="text-center mt-2 tracking-[.04em]">
        made with <span className="text-acc">♥</span>
      </div>
    </footer>
  )
}
