// A vertical chain of steps. Rendered as an ordered list so the sequence is available to screen readers.
export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="my-8 max-w-[420px]">
      {steps.map((step, i) => (
        <li key={step} className="relative pb-3 pl-9 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-7 bottom-0 left-[11px] w-px bg-gradient-to-b from-acc to-bd2"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute top-[7px] left-0 grid size-[23px] place-items-center rounded-full border border-bd2 bg-bg font-mono text-[11px] text-tx3"
          >
            {i + 1}
          </span>
          <span className="block rounded-lg border border-bd bg-bg2 px-3.5 py-2 font-mono text-[13px] text-tx2">
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}
