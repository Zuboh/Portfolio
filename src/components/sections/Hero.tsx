import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Clock } from '@/components/ui/Clock'
import { Icon } from '@/components/ui/Icon'
import { Starfield } from '@/components/ui/Starfield'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const linkClass =
  'inline-flex items-center gap-2 text-sm text-tx2 transition-colors hover:text-tx'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pt-[clamp(80px,12vw,152px)] pb-10"
    >
      <div
        aria-hidden="true"
        className="sky pointer-events-none absolute inset-x-0 -top-[68px] bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />
      <Starfield className="-z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <Container className="grid items-center gap-12 md:grid-cols-[1.25fr_1fr]">
        <div className="relative z-10">
          <div
            className="rise flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ '--d': '0ms' } as React.CSSProperties}
          >
            <p className="inline-flex py-1.5 font-mono text-[13px] text-tx3">
              {dict.hero.role}
            </p>
            <Clock
              className="font-mono text-[13px]"
              label={dict.common.timeIn}
            />
          </div>

          <h1
            id="hero-title"
            className="rise mt-6 text-[clamp(40px,6.5vw,80px)] leading-[0.97] font-semibold tracking-[-0.058em]"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            Lorenzo <span className="text-acc light:text-tx">Zubani</span>
          </h1>

          <p
            className="rise mt-7 max-w-[52ch] text-[clamp(16px,1.4vw,18px)] text-tx2 [text-wrap:pretty]"
            style={{ '--d': '160ms' } as React.CSSProperties}
          >
            {dict.hero.intro}
          </p>

          <p
            className="rise mt-5 inline-flex items-center gap-2.5 font-mono text-[13px] text-tx2"
            style={{ '--d': '200ms' } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-acc"
            />
            {dict.hero.availability}
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-2.5"
            style={{ '--d': '240ms' } as React.CSSProperties}
          >
            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              <Icon name="mail" className="text-base" />
              {dict.common.getInTouch}
            </a>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Icon name="download" className="text-base" />
              {dict.common.resume}
            </a>
          </div>

          <div
            className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3"
            style={{ '--d': '320ms' } as React.CSSProperties}
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Icon name="github" className="text-[17px]" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Icon name="linkedin" className="text-[17px]" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="rise-lift relative mx-auto w-full max-w-[210px] md:max-w-[340px] md:justify-self-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 aspect-square top-[2%] -right-[18%] w-[33%] md:top-[4%] md:right-[calc(-1*clamp(0px,calc((100vw_-_1080px)/2_-_55px),110px))] md:w-[26%]"
          >
            <div className="sun-glow absolute top-1/2 left-1/2 size-[min(130vw,1000px)] -translate-1/2" />
          </div>
          <div
            aria-hidden="true"
            className="celestial-sky pointer-events-none absolute z-0 top-[2%] -right-[18%] w-[33%] md:top-[4%] md:right-[calc(-1*clamp(0px,calc((100vw_-_1080px)/2_-_55px),110px))] md:w-[26%]"
          >
            <Image
              src="/moon.png"
              alt=""
              width={288}
              height={288}
              sizes="(min-width: 768px) 88px, 70px"
              className="drift celestial celestial-moon h-auto w-full"
            />
            <Image
              src="/sun.png"
              alt=""
              width={320}
              height={320}
              sizes="(min-width: 768px) 104px, 80px"
              className="drift celestial celestial-sun absolute inset-0 h-auto w-full"
            />
          </div>
          <div className="float rim group relative z-10">
            <Image
              src="/hero-body-2.png"
              alt=""
              aria-hidden="true"
              width={720}
              height={748}
              sizes="(min-width: 768px) 340px, 210px"
              preload
              fetchPriority="high"
              className="h-auto w-full"
            />
            <Image
              src="/hero-arm-rest-2.png"
              alt=""
              aria-hidden="true"
              width={720}
              height={748}
              sizes="(min-width: 768px) 340px, 210px"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-auto w-full transition-opacity duration-[240ms] ease-out group-hover:opacity-0 group-hover:delay-[140ms] group-hover:duration-[160ms]"
            />
            <Image
              src="/hero-arm-wave-2.png"
              alt=""
              aria-hidden="true"
              width={720}
              height={748}
              sizes="(min-width: 768px) 340px, 210px"
              fetchPriority="low"
              className="absolute inset-0 h-auto w-full opacity-0 transition-opacity delay-[140ms] duration-[160ms] ease-out group-hover:opacity-100 group-hover:delay-0 group-hover:duration-[240ms]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
