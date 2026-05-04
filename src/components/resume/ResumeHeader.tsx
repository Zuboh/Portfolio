import Link from 'next/link'
import Image from 'next/image'

export function ResumeHeader() {
  return (
    <div
      className="flex gap-6 items-start mb-12 flex-wrap"
      style={{ animation: 'fadeUp .5s ease both' }}
    >
      <Image
        src="/profile-image.jpeg"
        alt="Lorenzo Zubani"
        width={128}
        height={128}
        className="w-32 h-32 rounded-full border-[0.5px] border-bd shrink-0 object-cover"
      />
      <div className="flex-1">
        <h1 className="text-[clamp(22px,4vw,32px)] font-medium tracking-[-0.02em] text-tx mb-1">
          Lorenzo Zubani
        </h1>

        <p className="text-xs text-acc tracking-[.06em] mb-2.5">
          Frontend &amp; AI Engineer
        </p>

        <p className="text-[11px] text-tx2 leading-[1.8] max-w-110 mb-3.5">
          Frontend engineer focused on architecture and design systems. Growing into AI engineering
          — integrating LLMs as core product experience, not just features. Based in Brescia, Italy.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
          {[
            { label: 'lorenzozubani1999@gmail.com', href: 'mailto:lorenzozubani1999@gmail.com' },
            { label: 'Brescia, Italy', href: null },
            { label: 'linkedin', href: 'https://www.linkedin.com/in/lorenzo-zubani/' },
            { label: 'github.com/zuboh', href: 'https://github.com/zuboh' },
          ].map(({ label, href }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[10px] text-tx3 no-underline border-b-[0.5px] border-bd pb-0.5 tracking-[.04em] transition-colors duration-200 hover:text-acc hover:border-acc"
              >
                {label}
              </a>
            ) : (
              <span key={label} className="text-[10px] text-tx3 tracking-[.04em]">
                {label}
              </span>
            )
          )}
        </div>

        <div className="mt-3.5">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-[10px] text-tx3 no-underline border-b-[0.5px] border-bd pb-0.5 tracking-[.06em] transition-colors duration-200 hover:text-acc hover:border-acc"
          >
            ↓ download pdf
          </Link>
        </div>
      </div>
    </div>
  )
}
